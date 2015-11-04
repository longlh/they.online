'use strict';

require('..').config([
	'$stateProvider',
	'shared.services.template',
	'auth.resolvers.session',
	'profile.resolvers.profile',
	function($stateProvider, template, sessionResolver, profileResolver) {
		$stateProvider.state('profile', {
			url: '/profile',
			templateUrl: template('profile/partials/profile'),
			controller: 'profile.controller.profile',
			resolve: {
				_session: sessionResolver,
				_profile: profileResolver
			}
		});
	}
]);
