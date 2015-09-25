'use strict';

exports._ = '/config/env/nighty';
exports._factory = function() {
	return {
		debug: true,
		host: 'nighty.they.online',
		port: 4000,
		db: 'mongodb://localhost/they-online-nighty',
		session: {
			cookie: '_sid_nighty',
			expiry: 24 * 60 * 60 * 1000 // 1 day
		},
		mail: {
			from: 'no-reply@they.online',
			region: 'us-west-2',
			accessKeyId: 'AKIAI6W6J2H4K4W3OZKA',
			secretAccessKey: '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'
		}
	};
};
