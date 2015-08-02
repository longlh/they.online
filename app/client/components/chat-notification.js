;(function() {
	'use strict';

	angular.module('easy-chat').directive('comChatNotification', [
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
							$timeout(function() {
								counting = false;
								$scope.inbox = 0;
							});
						});

						Emitter.on('agent:inactive', function() {
							$timeout(function() {
								counting = true;
							});
						});
					}
				]
			};
		}
	]);
})();
