'use strict';

require('..').factory('tenant.models.tenant', [
	'shared.services.model-factory',
	function(modelFactory) {
		var Tenant = modelFactory.model({
			resource: {
				path: '/api/tenants/:id',
				defaultParameters: {
					id: '@_id'
				}
			},
			instantiation: {
				defaultProperties: {
					_ignores: ['_id', '__v']
				}
			}
		});

		return Tenant.class;
	}
]);
