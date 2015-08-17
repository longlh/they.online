'use strict';

exports._ = '/http';
exports._requires = [
	'@http',
	'/config/express'
];
exports._activations = [
	'/app',
	'/socket'
];
exports._factory = function(http, app) {
	var httpServer = http.Server(app);

	return httpServer;
};
