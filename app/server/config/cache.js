'use strict';

exports._ = '/config/cache';
exports._requires = [
	'/config/redis'
];
exports._factory = function(redis) {
	var self = {};

	self.get = function(key, expiry) {
		return redis.get(key).then(function(value) {
			if (value && expiry) {
				return self.expire(key, expiry, value);
			}

			return value;
		});
	};

	self.put = function(key, value, expiry) {
		return redis.set(key, value).then(function() {
			if (expiry) {
				return self.expire(key, expiry, value);
			}

			return value;
		});
	};

	self.expire = function(key, expiry, value) {
		return redis.expire(key, expiry).then(function() {
			return value;
		});
	};

	self.clear = function(key) {
		return redis.del(key);
	};

	return self;
};
