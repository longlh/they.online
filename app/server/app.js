'use strict';

exports._ = '/server/app';
exports._requires = [
	'@path',
	'@express',
	'@body-parser',
	'/config/env'
];
exports._activations = [
	'/server/core/view-engine',
	'/server/routes/core',
	'/server/routes/agent'
];
exports._factory = function(path, express, bodyParser, env) {
	var app = express();

	// use static middleware in `development` mode
	if (env.profile === 'development') {
		app.use('/public', express.static(path.resolve(env.rootDir, 'app/client/public')));
		app.use('/lib', express.static(path.resolve(env.rootDir, 'bower_components')));
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	return app;
};
