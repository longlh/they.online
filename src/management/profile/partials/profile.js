'use strict';

require('..').controller('profile.controller.profile', [
	'$scope',
	'_profile',
	function($scope, profile) {
		console.log('My account');
		console.log(profile);
	}
]);
