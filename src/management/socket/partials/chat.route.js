'use strict';

require('..').config([
	'$stateProvider',
	'shared.services.template',
	'auth.resolvers.session',
	function($stateProvider, template, sessionResolver) {
		$stateProvider.state('chat', {
			url: '/chat',
			templateUrl: template('socket/partials/chat'),
			controller: 'socket.controllers.chat',
			resolve: {
				_session: sessionResolver
			}
		});
	}
]);
