;(function() {
	'use strict';

	angular.module('easy-chat').config([
		'$routeProvider',
		'/services/template',
		'/resolvers/session',
		'/resolvers/tenant',
		function($routeProvider, template, sessionResolver, tenantResolver) {
			$routeProvider.when('/tenant', {
				redirectTo: '/tenant/current'
			}).when('/tenant/:id', {
				controller: '/controllers/tenant',
				templateUrl: template('tenant'),
				resolve: {
					_session: sessionResolver,
					_tenant: tenantResolver
				}
			});
		}
	]);
})();
