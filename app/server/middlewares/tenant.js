'use strict';

exports._ = '/server/middlewares/tenant';
exports._requires = [
	'@bluebird',
	'/server/models/tenant'
];
exports._factory = function(Promise, Tenant) {
	var self = {};

	self.current = function(req, res, next) {
		// get signed-in agent
		var agent = req.user;

		// populate tenent of signed-in agent
		agent.populate('tenant');

		Promise.resolve(agent.execPopulate()).then(function(agent) {
			res.locals._tenant = agent.tenant;
			next();
		}).catch(next);
	};

	self.identify = function(identifier) {
		return function(req, res, next) {
			var id = req.params[identifier];

			var query = Tenant.findById(id);

			Promise.resolve(query.exec()).then(function(tenant) {
				res.locals._tenant = tenant;

				next();
			}).catch(next);
		};
	};

	return self;
};
