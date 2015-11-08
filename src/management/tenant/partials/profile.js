'use strict';

require('..').controller('tenant.controllers.profile', [
	'$scope',
	'_agent',
	'shared.services.switch-icon',
	function($scope, agent, switchIcon) {

		$scope.profile = agent.profile;

		$scope.save = function() {
			$scope.icon = switchIcon.save('processing');

			$scope.profile.save().then(function() {
				$scope.icon = switchIcon.save('success');

				setTimeout(function() {

					$scope.icon = switchIcon.save();
				});
			});
		};

		function init() {
			$scope.icon = switchIcon.save('save');
		}

		init();
	}
]);
