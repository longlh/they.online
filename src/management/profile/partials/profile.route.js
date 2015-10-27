'use strict';

require('..').config([
	'$stateProvider',
	'shared.services.template',
	'auth.resolvers.session',
	function($stateProvider, template, sessionResolver) {
		$stateProvider.state('profile', {
			url: '/profile',
			templateUrl: template('profile/partials/profile'),
			controller: 'profile.controller.profile',
			resolve: {
				_session: sessionResolver
			}
		});
	}
]);
