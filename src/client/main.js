;(function() {
	'use strict';

	angular.element(window).ready(function() {
		angular.bootstrap(document.body, [APP]);
	});

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
		'SESSION',
		'/models/session',
		'/services/storage',
		function(SESSION, Session, storage) {
			// deserialize session from server-pass data
			var session = new Session(SESSION);

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
