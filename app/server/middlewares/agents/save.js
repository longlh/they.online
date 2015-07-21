'use strict';

exports._ = '/server/middlewares/agents/save';
exports._requires = [
	'/server/models/agent',
	'/server/models/tenant'
];
exports._factory = function(Agent, Tenant) {
	return function(req, res, next) {
		var tenant = new Tenant({
			displayName: 'Tenant [' + Date.now() + ']',
			plan: 'free'
		});

		tenant.save(function(err, tenant, affectedRows) {
			var agent = new Agent();
			agent.displayName = 'Agent [' + Date.now() + ']';
			agent.tenant = tenant._id;
			agent.admin = true;
			agent.accounts.push({
				kind: 'internal',
				uid: req.body.uid,
				password: 'xxx'
			});

			agent.save(function(err, agent, affectedRows) {
				res.redirect('/agents/create');
			});
		});
	};
};
