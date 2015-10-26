'use strict';

require('..').controller('tenant.controllers.tenant', [
	'$scope',
	'_tenant',
	'shared.services.event-hub',
	function($scope, tenant, Emitter) {
		$scope.tenant = tenant;

		// PUBLIC API
		$scope.update = function() {
			Emitter.emit('tenant:update', $scope.tenant);
		};

		// PRIVATE API
		$scope._update = function(tenant) {
			tenant.save();
		};

		// MESSAGES
		Emitter.on('tenant:update', function(tenant) {
			$scope._update(tenant);
		});
	}
]);
