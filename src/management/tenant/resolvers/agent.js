'use strict';

require('..').constant('tenant.resolvers.agent', [
	'$stateParams',
	'tenant.models.agent',
	function($stateParams, Agent) {
		return Agent.get({
			id: $stateParams.id
		});
	}
]);
