'use strict';

require('..').constant('tenant.resolvers.tenant', [
	'$stateParams',
	'tenant.models.tenant',
	function($stateParams, Tenant) {
		return Tenant.get({
			id: $stateParams.id
		});
	}
]);
