'use strict';

require('..').config([
	'$stateProvider',
	'shared.services.template',
	'auth.resolvers.session',
	function($stateProvider, template, sessionResolver) {
		$stateProvider.state('account', {
			url: '/account',
			templateUrl: template('account/partials/account'),
			controller: 'account.controller.account'
		});
	}
]);
