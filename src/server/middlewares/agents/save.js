'use strict';

exports.name = '/middlewares/agents/save';
exports.requires = [
	'/models/agent',
	'/models/tenant'
];
exports.factory = function(Agent, Tenant) {
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
