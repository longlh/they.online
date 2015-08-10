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
	'/server/core/assets',
	'/server/core/view-engine',
	'/server/routes/auth',
	'/server/routes/core',
	'/server/routes/agent',
	'/server/routes/api'
];
exports._factory = function(path, express, bodyParser, cookieParser, auth, env) {
	var app = express();

	// use static middleware in `development` mode
	if (env.profile === 'development') {
		app.use('/app', express.static(path.resolve(env.rootDir, 'app/client')));
		app.use('/public', express.static(path.resolve(env.rootDir, 'app/public')));
		app.use('/lib', express.static(path.resolve(env.rootDir, 'bower_components')));
		app.use('/build', express.static(path.resolve(env.rootDir, 'build/out')));
	}

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(cookieParser());

	app.use(auth.initialize());
	app.use(auth.session());

	app.set('env', env.profile);
	app.set('x-powered-by', false);

	return app;
};
