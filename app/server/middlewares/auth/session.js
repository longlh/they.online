'use strict';

exports._ = '/server/middlewares/auth/session';
exports._requires = [
	'@bluebird',
	'@node-uuid',
	'/server/core/cache',
	'/server/models/agent'
];
exports._factory = function(Promise, uuid, cache, Agent) {
	var self = {};

	self.serialize = function(req, res, next) {
		if (!req.user) {
			return next(new Error('Invalid authentication state'));
		}

		var sessionId = uuid.v4();

		// store sessionId in client-side
		res.cookie('sid', sessionId);

		// store sessionId in server-side
		cache.put(sessionId, req.user.id).then(next).catch(next);
	};

	self.deserialize = function(req, res, next) {
		var sid = req.cookies.sid;

		if (!sid) {
			return next();
		}

		cache.get(sid).then(function(agentId) {
			if (!agentId) {
				return;
			}

			var query = Agent.findById(agentId);

			var find = Promise.promisify(query.exec, query);

			return find();
		}).then(function(agent) {
			req.user = agent;

			next();
		}).catch(next);
	};

	return self;
};
