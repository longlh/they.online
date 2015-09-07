'use strict';

exports._ = '/config/express';
exports._requires = [
	'@express',
	'@body-parser',
	'@cookie-parser',
	'@path',
	'/config/env'
];
exports._factory = function(express, bodyParser, cookieParser, path, env) {
	var app = express();

	// use static middleware in `development` profile
	if (env.development) {
		app.use('/app', express.static(path.resolve(env._root, 'app/client')));
		app.use('/public', express.static(path.resolve(env._root, 'app/public')));
		app.use('/lib', express.static(path.resolve(env._root, 'bower_components')));
		app.use('/build', express.static(path.resolve(env._root, 'build/out')));
	}

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(cookieParser());

	app.set('env', env._profile);
	app.enable('trust proxy');
	app.disable('x-powered-by');

	app.use(function(req, res, next) {
		res.locals._env = env;

		next();
	});

	return app;
};
