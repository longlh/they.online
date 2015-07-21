'use strict';

exports._ = '/server/core/cache';
exports._requires = [
	'@bluebird',
	'@redis',
	'/config/env'
];
exports._factory = function(Promise, redis, env) {
	var store = {};

	return {
		get: function(key) {
			return Promise.resolve(store[key]);
		},
		put: function(key, value, cb) {
			store[key] = value;

			return Promise.resolve();
		}
	};
};
