;(function() {
	'use strict';

	var TenantFactory = function(ModelFactory) {
		var Tenant = ModelFactory.model({
			resource: {
				path: '/api/tenants/:id',
				defaultParameters: {
					id: '@_id'
				}
			},
			instantiation: {
				defaultProperties: {
					_ignore: ['_id', '__v']
				}
			}
		});

		return Tenant.class;
	};

	angular.module('easy-chat').factory('/models/tenant', [
		'/services/model-factory',
		TenantFactory
	]);
})();
