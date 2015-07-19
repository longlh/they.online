'use strict';

exports._ = '/config/env/development';
exports._factory = function() {
	return {
		db: 'mongodb://localhost/easy-chat-dev',
		port: 3000
	};
};
