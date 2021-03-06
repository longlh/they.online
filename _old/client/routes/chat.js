;(function() {
	'use strict';

	angular.module(APP).config([
		'$routeProvider',
		'/services/template',
		'/resolvers/session',
		function($routeProvider, template, sessionResolver) {
			$routeProvider.when('/chat', {
				controller: '/controllers/chat',
				templateUrl: template('chat'),
				resolve: {
					_session: sessionResolver
				}
			});
		}
	]);
})();
