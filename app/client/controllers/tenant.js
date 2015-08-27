;(function() {
	'use strict';

	angular.module(APP).controller('/controllers/tenant', [
		'$scope',
		'_tenant',
		'/data/script',
		function($scope, _tenant, script) {
			$scope.tenant = _tenant;
			$scope.script = script;

			$scope.save = function() {
				return $scope.tenant.save();
			};
		}
	]);
})();
