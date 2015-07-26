'use strict';

exports._ = '/server/routes/api';
exports._requires = [
	'/server/app',
	'/server/middlewares/auth/filter',
	'/server/middlewares/tenant',
	'/server/middlewares/util'
];
exports._factory = function(app, authFilter, tenant, util) {
	app.use('/api', authFilter.blockUnauthenticated);

	app.get('/api/sessions/current', util.status(204));

	app.get('/api/tenants/current', tenant.current, util.json('_tenant'));

	app.route('/api/tenants/:id')
			.post(tenant.identify('id'), tenant.update, util.json('_tenant'));
};
