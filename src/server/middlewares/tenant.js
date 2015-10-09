'use strict';

exports.name = '/middlewares/tenant';
exports.requires = [
	'@bluebird',
	'/models/tenant'
];
exports.factory = function(Promise, Tenant) {
	var self = {};

	self.current = function(req, res, next) {
		// get signed-in agent
		var agent = req.user;

		// populate tenent of signed-in agent
		agent.populate('tenant');

		return Promise.resolve(agent.execPopulate()).then(function(agent) {
			res.locals._tenant = agent.tenant;
			next();
		}).catch(next);
	};

	self.identify = function(identifier) {
		return function(req, res, next) {
			var id = req.params[identifier];

			var query = Tenant.findById(id);

			return Promise.resolve(query.exec()).then(function(tenant) {
				res.locals._tenant = tenant;

				next();
			}).catch(next);
		};
	};

	self.update = function(req, res, next) {
		// specify tenant's fields should be updated
		var query = Tenant.findByIdAndUpdate(res.locals._tenant._id, {
			name: req.body.name,
			email: req.body.email,
			plan: req.body.plan,
			biography: req.body.biography
		}, {
			new: true
		});

		return Promise.resolve(query.exec()).then(function(tenant) {
			res.locals._tenant = tenant;

			next();
		}).catch(next);
	};

	return self;
};
