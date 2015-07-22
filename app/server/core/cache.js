'use strict';

exports._ = '/server/core/cache';
exports._requires = [
	'@bluebird',
	'@redis',
	'/config/env'
];
exports._factory = function(Promise, redis, env) {
	var store = {};
	var timeout = {};
	var self = {};

	self.get = function(key, expiry) {
		var value = store[key];

		if (value) {
			return self.expire(key, expiry);
		}

		return Promise.resolve(value);
	};

	self.put = function(key, value, expiry) {
		store[key] = value;

		return self.expire(key, expiry);
	};

	self.expire = function(key, expiry) {
		clearTimeout(timeout[key]);

		if (expiry) {
			timeout[key] = setTimeout(function() {
				console.log('clear');
				self.clear(key);
			}, expiry);
		}

		return Promise.resolve(store[key]);
	};

	self.clear = function(key) {
		delete store[key];
		delete timeout[key];

		return Promise.resolve();
	};

	return self;
};
