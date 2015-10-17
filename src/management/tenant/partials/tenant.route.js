'use strict';

require('..').config([
	'$stateProvider',
	'shared.services.template',
	'auth.resolvers.session',
	'tenant.resolvers.tenant',
	function($stateProvider, template, sessionResolver, tenantResolver) {
		$stateProvider.state('tenant', {
			url: '/tenant/:id',
			templateUrl: template('tenant/partials/tenant'),
			controller: 'tenant.controllers.tenant',
			resolve: {
				_session: sessionResolver,
				_tenant: tenantResolver
			}
		});
	}
]);
