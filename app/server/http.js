'use strict';

exports._ = '/server/http';
exports._requires = [
	'@http',
	'/server/app'
];
exports._activations = [
	'/server/socket'
];
exports._factory = function(http, app) {
	var httpServer = http.Server(app);

	return httpServer;
};
