'use strict';

exports._ = '/main';
exports._requires = [
	'/config/env',
	'/server/http'
];
exports._factory = function(env, httpServer) {
	httpServer.listen(env.port, function() {
		console.log('Application start at :' + env.port);
	});
};
