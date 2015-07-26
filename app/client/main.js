;(function() {
	'use strict';

	angular.module('easy-chat', [
		'ngRoute',
		'ngResource'
	]).config([
		'$routeProvider',
		'/services/template',
		function($routeProvider, template) {
			$routeProvider.when('/', {
				controller: '/controllers/dashboard',
				templateUrl: template('dashboard'),
				resolve: {
					_session: '/resolvers/session'
				}
			}).otherwise({
				redirectTo: '/'
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
