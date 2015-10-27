;(function() {
	'use strict';

	angular.module(APP).controller('/controllers/dashboard', [
		'$scope',
		function($scope) {
			$scope.title = 'Hello world';
		}
	]);
})();
