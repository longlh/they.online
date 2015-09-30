'use strict';

exports.name = '/config/redis';
exports.requires = [
	'@bluebird',
	'@redis',
	'/config/env'
];
exports.factory = function(Promise, redis, env) {
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
