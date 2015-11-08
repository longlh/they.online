'use strict';

require('..').controller('tenant.controllers.profile', [
	'$scope',
	'_agent',
	function($scope, agent) {

		$scope.profile = agent.profile;

		$scope.save = function() {
			$scope.statusCurrent = 'processing';

			$scope.profile.save().then(function() {
				$scope.statusCurrent = 'success';
			});
		};

		function init() {
			$scope.statusCurrent = 'save';
		}

		init();
	}
]);
