;(function() {
	'use strict';

	angular.module('easy-chat', [
		'ngRoute',
		'ngResource'
	]).config([
		'$routeProvider',
		'/services/template',
		function($routeProvider, template) {
			var sessionResolver = [
				'$q',
				'/services/storage',
				function($q, storage) {
					var session = storage.get('session');

					if (!session) {
						return $q.reject();
					}

					return session.ping();
				}
			];

			$routeProvider.when('/', {
				controller: '/controllers/dashboard',
				templateUrl: template('dashboard'),
				resolve: {
					_session: sessionResolver
				}
			}).when('/tenant', {
				controller: '/controllers/tenant',
				templateUrl: template('tenant'),
				resolve: {
					_session: sessionResolver
				}
			}).otherwise({
				redirectTo: '/pages/404'
			}).caseInsensitiveMatch = true;
		}
	]).run([
		'data',
		'/models/session',
		'/services/storage',
		function(data, Session, storage) {
			var session = new Session(data);

			storage.put('session', session);
		}
	]).run([
		'$rootScope',
		'$location',
		function($rootScope, $location) {
			// handle error when route resolving failed
			$rootScope.$on('$routeChangeError', function(event, next, previous, error) {
				event.preventDefault();

				if (error.status === 401) {
					location.href = '/';
					return;
				}

				// location.href = '/signin';
			});
		}
	]).run([
		'$http',
		'/services/storage',
		function($http, storage) {
			$http.defaults.headers.common.Authentication = storage.get('session').id;
		}
	]);
})();
