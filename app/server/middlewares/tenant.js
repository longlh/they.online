'use strict';

exports._ = '/server/middlewares/tenant';
exports._requires = [
	'@bluebird',
	'/server/models/tenant'
];
exports._factory = function(Promise, Tenant) {
	var self = {};

	self.current = function(req, res, next) {
		var agent = req.user;

		// get tenent of signed-in agent
		agent.populate('tenant');

		Promise.resolve(agent.execPopulate()).then(function(agent) {
			res.locals._tenant = agent.tenant;
			next();
		}).catch(next);
	};

	return self;
};
