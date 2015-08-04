;(function() {
	'use strict';

	angular.module(APP).controller('/controllers/tenant', [
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
