'use strict';

require('..').config([
	'$stateProvider',
	'shared.services.template',
	'auth.resolvers.session',
	'tenant.resolvers.agent',
	function($stateProvider, template, sessionResolver, agentResolver) {
		$stateProvider.state('profile', {
			url: '/agents/:id/profile',
			templateUrl: template('tenant/partials/profile'),
			controller: 'tenant.controllers.profile',
			resolve: {
				_session: sessionResolver,
				_agent: agentResolver
			}
		});
	}
]);
