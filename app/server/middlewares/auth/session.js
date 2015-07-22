'use strict';

exports._ = '/server/middlewares/auth/session';
exports._requires = [
	'@lodash',
	'@bluebird',
	'@node-uuid',
	'/server/core/cache',
	'/server/models/agent'
];
exports._factory = function(_, Promise, uuid, cache, Agent) {
	function storeSession(res, sid, data) {
		res.locals._session = {
			id: sid,
			data: _.pick(data, 'displayName') // pick some public information only
		};
	}

	var self = {};

	self.serialize = function(req, res, next) {
		if (!req.user) {
			return next(new Error('Invalid authentication state'));
		}

		var sid = uuid.v4();

		// store sessionId in client-side
		res.cookie('sid', sid, {
			httpOnly: true
		});

		// store sessionId in server-side
		storeSession(res, sid, req.user);

		cache.put(sid, req.user.id).then(next).catch(next);
	};

	self.deserialize = function(req, res, next) {
		// look in header first, then look in cookies
		var sid = req.headers.Authentication || req.cookies.sid;

		if (!sid) {
			return next();
		}

		return cache.get(sid).then(function(agentId) {
			if (!agentId) {
				return;
			}

			var query = Agent.findById(agentId);

			var find = Promise.promisify(query.exec, query);

			return find();
		}).then(function(agent) {
			req.user = agent;

			storeSession(res, sid, agent);

			next();
		}).catch(next);
	};

	self.destroy = function(req, res, next) {
		if (!res.locals._session) {
			return next();
		}

		// clear in cookie
		res.clearCookie('sid');
		cache.clear(res.locals._session.id).then(next).catch(next);
	};

	return self;
};
