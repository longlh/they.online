;(function() {
	'use strict';

	angular.module('easy-chat').controller('/controllers/dashboard', [
		'$scope',
		function($scope) {
			$scope.title = 'Hello world';
		}
	]);
})();
