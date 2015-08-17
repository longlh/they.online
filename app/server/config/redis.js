'use strict';

exports._ = '/config/redis';
exports._requires = [
	'@bluebird',
	'@redis',
	'/config/env'
];
exports._factory = function(Promise, redis, env) {
	var client = redis.createClient();

	// promisify
	var rGet = Promise.promisify(client.get, client);
	var rSet = Promise.promisify(client.set, client);
	var rDel = Promise.promisify(client.del, client);
	var rExpire = Promise.promisify(client.expire, client);

	return {
		get: rGet,
		set: rSet,
		del: rDel,
		expire: rExpire
	};
};
