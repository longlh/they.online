'use strict';

exports.name = '/app';
exports.requires = [
	'/config/express',
	'/config/auth'
];
exports.activations = [
	'/config/assets',
	'/config/view-engine',
	'/routes/auth',
	'/routes/registration',
	'/routes/core',
	'/routes/api'
];
exports.factory = function(app, auth) {
	app.use(auth.initialize());
	app.use(auth.session());

	return app;
};
