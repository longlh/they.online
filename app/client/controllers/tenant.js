;(function() {
	'use strict';

	angular.module('easy-chat').controller('/controllers/tenant', [
		'$scope',
		'_tenant',
		function($scope, tenant) {
			$scope.tenant = tenant;

			$scope.save = function() {
				return $scope.tenant.save();
			};
		}
	]);
})();
