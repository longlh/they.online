'use strict';

require('..').controller('tenant.controllers.tenant', [
	'$scope',
	'_tenant',
	function($scope, tenant) {
		console.log(tenant);
	}
]);
