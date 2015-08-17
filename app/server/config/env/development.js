'use strict';

exports._ = '/config/env/development';
exports._factory = function() {
	return {
		port: 3000,
		db: 'mongodb://localhost/easy-chat-dev',
		session: {
			cookie: '_sid',
			// expiry: 1 * 10 * 1000 // 1 hour
			expiry: 60 * 60 * 1000 // 1 hour
		}
	};
};
