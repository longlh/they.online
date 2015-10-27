'use strict';

require('..').controller('site.controllers.dashboard', [
	'$scope',
	'$interval',
	function($scope, $interval) {
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
