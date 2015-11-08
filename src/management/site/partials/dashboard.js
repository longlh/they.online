'use strict';

require('..').controller('site.controllers.dashboard', [
	'$scope',
	'$interval',
	function($scope, $interval) {
		var toggle = true;
		$scope.size = 30;

		$scope.switchIcon = function() {
			toggle = !toggle;

			$scope.icon = toggle ? 'send' : 'autorenew';
			// $scope.size = toggle ? 20 : 30;
		};

		$scope.agents = [{
			name: 'LongLH',
			email: 'long.luc@ntq-solution.com.vn',
			status: 'enabled'
		}];

		$scope.addAgent = function() {
			$scope.agents.push({
				name: Date.now(),
				email: Date.now() + '@they.online',
				status: 'enabled'
			});
		};
	}
]);
