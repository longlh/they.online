'use strict';

require('..').controller('tenant.controllers.tenant', [
	'$scope',
	'_tenant',
	function($scope, tenant) {
		$scope.tenant = tenant;

		$scope.update = function() {
			$scope.statusCurrent = 'processing';

			$scope.tenant.save().then(function() {
				$scope.statusCurrent = 'success';
			});
		};

		function init() {
			$scope.statusCurrent = 'save';
		}

		init();
	}
]);
