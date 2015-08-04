;(function() {
	'use strict';

	angular.module(APP, [
		'ngRoute',
		'ngResource'
	]).config([
		'$routeProvider',
		'/services/template',
		'/resolvers/session',
		function($routeProvider, template, sessionResolver) {
			$routeProvider.when('/', {
				controller: '/controllers/dashboard',
				templateUrl: template('dashboard'),
				resolve: {
					_session: sessionResolver
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
			// deserialize session from server-pass data
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
			});
		}
	]).run([
		'$http',
		'/services/storage',
		function($http, storage) {
			// add custom header for Authentication
			$http.defaults.headers.common.Authentication = storage.get('session').id;
		}
	]).run([
		'/services/chat',
		function(chat) {
			// connect chat server after app loaded
			chat.connect();
		}
	]);
})();
