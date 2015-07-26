;(function() {
	'use strict';

	angular.module('easy-chat').config([
		'$routeProvider',
		'/services/template',
		function($routeProvider, template) {
			$routeProvider.when('/tenant', {
				redirectTo: '/tenant/current'
			}).when('/tenant/:id', {
				controller: '/controllers/tenant',
				templateUrl: template('tenant'),
				resolve: {
					_session: '/resolvers/session',
					_tenant: '/resolvers/tenant'
				}
			});
		}
	]);
})();
