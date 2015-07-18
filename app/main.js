'use strict';

exports._ = '/main';
exports._requires = [
	'/config/env',
	'/server/http'
];
exports._factory = function(config, httpServer) {
	httpServer.listen(config.port, function() {
		console.log('Application start at :' + config.port);
	});
};
