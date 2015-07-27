;(function() {
	'use strict';

	angular.module('easy-chat').constant('/resolvers/tenant', [
		'$route',
		'/models/tenant',
		function($route, Tenant) {
			return Tenant.get({
				id: $route.current.params.id
			});
		}
	]);
})();
