;(function() {
	'use strict';

	angular.module(APP).directive('comChatNotification', [
		'/services/partial',
		function(partial) {
			return {
				restrict: 'E',
				templateUrl: partial('chat-notification'),
				scope: {},
				controller: [
					'$scope',
					'$timeout',
					'/services/event-emitter',
					function($scope, $timeout, Emitter) {
						var counting = true;
						$scope.inbox = 0;

						Emitter.on('message:receive', function() {
							if (!counting) {
								return;
							}

							$timeout(function() {
								$scope.inbox++;
							});
						});

						Emitter.on('agent:active', function() {
							counting = false;

							$timeout(function() {
								$scope.inbox = 0;
							});
						});

						Emitter.on('agent:inactive', function() {
							counting = true;
						});
					}
				]
			};
		}
	]);
})();
