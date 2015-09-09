'use strict';

exports._ = '/app';
exports._requires = [
	'/config/express',
	'/config/auth'
];
exports._activations = [
	'/config/assets',
	'/config/view-engine',
	'/routes/auth',
	'/routes/registration',
	'/routes/core',
	'/routes/api'
];
exports._factory = function(app, auth) {
	app.use(auth.initialize());
	app.use(auth.session());

	return app;
};
