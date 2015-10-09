;(function() {
	'use strict';

	angular.module(APP).constant('/resolvers/tenant', [
		'$route',
		'/models/tenant',
		function($route, Tenant) {
			return Tenant.get({
				id: $route.current.params.id
			});
		}
	]);
})();
