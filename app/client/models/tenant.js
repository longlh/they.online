;(function() {
	'use strict';

	angular.module('easy-chat').factory('/models/tenant', [
		'/services/model-factory',
		function(ModelFactory) {
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
		}
	]);
})();
