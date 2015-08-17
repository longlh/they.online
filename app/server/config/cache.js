'use strict';

exports._ = '/config/cache';
exports._requires = [
	'@bluebird',
	'@redis',
	'/config/env'
];
exports._factory = function(Promise, redis, env) {
	var self = {};
	var client = redis.createClient();
	// promisify
	var rGet = Promise.promisify(client.get, client);
	var rSet = Promise.promisify(client.set, client);
	var rDel = Promise.promisify(client.del, client);
	var rExpire = Promise.promisify(client.expire, client);

	self.get = function(key, expiry) {
		return rGet(key).then(function(value) {
			if (value && expiry) {
				return self.expire(key, expiry, value);
			}

			return value;
		});
	};

	self.put = function(key, value, expiry) {
		return rSet(key, value).then(function() {
			if (expiry) {
				return self.expire(key, expiry, value);
			}

			return value;
		});
	};

	self.expire = function(key, expiry, value) {
		return rExpire(key, expiry).then(function() {
			return value;
		});
	};

	self.clear = function(key) {
		return rDel(key);
	};

	return self;
};
