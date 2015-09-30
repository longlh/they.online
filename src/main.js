'use strict';

exports.name = '/main';
exports.requires = [
	'/config/env',
	'/http'
];
exports.factory = function(env, httpServer) {
	httpServer.listen(env.port, function() {
		console.log('Application start at :' + env.port + ' [' + env._profile + ']');
	});
};
