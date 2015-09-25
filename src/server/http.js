'use strict';

exports._ = '/http';
exports._requires = [
	'@http',
	'/app'
];
exports._activations = [
	'/socket'
];
exports._factory = function(http, app) {
	return http.Server(app);
};
