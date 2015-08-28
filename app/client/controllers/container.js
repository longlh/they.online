;(function() {
	'use strict';

	angular.module(APP).controller('/controllers/container', [
		'$scope',
		'/services/storage',
		function($scope, storage) {
			$scope.session = storage.get('session');
		}
	]);
})();
