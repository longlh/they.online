;(function() {
	'use strict';

	angular.module('easy-chat').controller('/controllers/tenant', [
		'$scope',
		'_tenant',
		function($scope, tenant) {
			$scope.tenant = tenant;

			$scope.save = function() {
				console.log($scope.tenant);

				$scope.tenant.save();
			};
		}
	]);
})();
