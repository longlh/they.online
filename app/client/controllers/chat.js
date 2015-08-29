;(function() {
	'use strict';

	angular.module(APP).controller('/controllers/chat', [
		'@lodash',
		'$scope',
		'$timeout',
		'/services/event-hub',
		'/services/chat',
		'/services/storage',
		function(_, $scope, $timeout, EventHub, chat, storage) {
			function activate() {
				$scope.conversations = chat.conversations;
				$scope.replies = {};
				$scope.activeConversation = null;

				// join first conversation in list
				$scope.join(_.find($scope.conversations));
			}

			var deregistors = [];

			deregistors.push(
				EventHub.on('conversation:start', function(conversation) {
					if (!$scope.activeConversation) {
						$scope.join(conversation);
					}

					$scope.$digest();
				})
			);

			deregistors.push(
				EventHub.on('chat:receive', function(message) {
					if ($scope.activeConversation && $scope.activeConversation.visitor.id === message.visitor) {
						$scope.activeConversation.read();
					}

					$scope.$digest();
				})
			);

			$scope.$on('$destroy', function() {
				_.forEach(deregistors, function(off) {
					off();
				});
			});

			$scope.sendMessage = function(event) {
				event.preventDefault();

				var visitorId = $scope.activeConversation.visitor.id;

				if ($scope.replies[visitorId]) {
					chat.sendMessage(visitorId, $scope.replies[visitorId]);

					// reset textbox
					$scope.replies[visitorId] = null;
				}
			};

			$scope.join = function(conversation) {
				$scope.activeConversation = conversation;

				if (conversation) {
					conversation.read();
				}
			};

			activate();
		}
	]);
})();
