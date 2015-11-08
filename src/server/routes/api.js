'use strict';

exports.name = '/routes/api';
exports.requires = [
	'/app',
	'/middlewares/auth/filter',
	'/middlewares/tenant',
	'/middlewares/util',
	'/middlewares/agent'
];
exports.factory = function(app, authFilter, tenant, util, agent) {
	app.use('/api', authFilter.blockUnauthenticated);

	app.get('/api/sessions/current', util.json('_session'));

	app.get('/api/tenants/current', tenant.current, util.json('_tenant'));

	app.route('/api/tenants/:id')
			.post(tenant.identify('id'), tenant.update, util.json('_tenant'));

	app.get('/api/agents/me', util.json('_session.agent'));

	app.route('/api/agents/:id/profile')
		.post(agent.identify('id'), agent.updateProfile, util.json('_agent.profile'));
};
