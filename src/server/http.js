'use strict';

exports.name = '/http';
exports.requires = [
	'@http',
	'/app'
];
exports.activations = [
	'/socket'
];
exports.factory = function(http, app) {
	return http.Server(app);
};
