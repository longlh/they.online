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
						$scope.inbox = 0;
						Emitter.on('message', function(message) {
							$timeout(function() {
								$scope.inbox++;
							});
						});
					}
				],
				link: function($scope) {
					console.log(arguments);
				}
			};
		}
	]);
})();
