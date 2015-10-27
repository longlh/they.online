'use strict';

require('..').config([
	'$stateProvider',
	'shared.services.template',
	'auth.resolvers.session',
	function($stateProvider, template, sessionResolver) {
		$stateProvider.state('dashboard', {
			url: '/',
			templateUrl: template('site/partials/dashboard'),
			controller: 'site.controllers.dashboard',
			resolve: {
				_session: sessionResolver
			}
		});
	}
]);
