'use strict';

exports._ = '/server/app';
exports._requires = [
	'@path',
	'@express',
	'@body-parser',
	'@cookie-parser',
	'/server/core/auth',
	'/config/env'
];
exports._activations = [
	'/server/core/view-engine',
	'/server/routes/auth',
	'/server/routes/core',
	'/server/routes/agent'
];
exports._factory = function(path, express, bodyParser, cookieParser, auth, env) {
	var app = express();

	// use static middleware in `development` mode
	if (env.profile === 'development') {
		app.use('/public', express.static(path.resolve(env.rootDir, 'app/client/public')));
		app.use('/lib', express.static(path.resolve(env.rootDir, 'bower_components')));
	}

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(cookieParser());

	// app.use(session({
	// 	secret: 'xxx',
	// 	resave: false,
	// 	saveUninitialized: false
	// }));
	app.use(auth.initialize());
	app.use(auth.session());

	return app;
};
