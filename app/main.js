'use strict';

exports._ = '/main';
exports._requires = [
	'/config/env',
	'/server',
	'/server/router'
];
exports._factory = function(config, app) {
	app.listen(config.port, function() {
		console.log('Application start at :' + config.port);
	});
};
