'use strict';

require('..').controller('profile.controller.profile', [
	'$scope',
	'_profile',
	function($scope, profile) {

		$scope.profile = profile;

		$scope.update = function() {
			$scope.profile.save();
		};
	}
]);
