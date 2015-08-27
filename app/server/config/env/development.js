'use strict';

exports._ = '/config/env/development';
exports._factory = function() {
	return {
		host: '192.168.164.128',
		port: 3000,
		db: 'mongodb://localhost/easy-chat-dev',
		session: {
			cookie: '_sid',
			// expiry: 1 * 10 * 1000 // 1 hour
			expiry: 60 * 60 * 1000 // 1 hour
		},
		mail: {
			from: 'no-reply@indie.codes',
			region: 'us-west-2',
			accessKeyId: 'AKIAI6W6J2H4K4W3OZKA',
			secretAccessKey: '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'
		}
	};
};
