;(function() {
	'use strict';

	angular.module(APP).controller('/controllers/chat', [
		'@lodash',
		'$scope',
		'$timeout',
		'/services/event-emitter',
		'/services/chat',
		'/services/storage',
		function(_, $scope, $timeout, Emitter, chat, storage) {
			// force scope does dirty check
			// var off = Emitter.on('message:receive', function() {
			// 	console.log(JSON.stringify($scope.conversations));

			// 	$scope.$digest();
			// });

			// $scope.conversations = storage.get('conversations');
			// $scope.replies = {};

			// $scope.reply = function(visitor) {
			// 	if (!$scope.replies[visitor]) {
			// 		return;
			// 	}

			// 	chat.reply(visitor, $scope.replies[visitor]);

			// 	// reset checkbox after send reply
			// 	$scope.replies[visitor] = '';
			// };

			// // agent inactives
			// $scope.$on('$destroy', function() {
			// 	Emitter.emit('agent:inactive');
			// 	off();
			// });

			// // agent actives
			// Emitter.emit('agent:active');

			function activate() {
				var deregistors = [];
				$scope.conversations = chat.conversations;
				$scope.replies = {};
				$scope.activeConversation = null;

				deregistors.push(
					Emitter.on('conversation:start', function(conversation) {
						if (!$scope.activeConversation) {
							$scope.join(conversation);
						}

						$scope.$digest();
					})
				);

				deregistors.push(
					Emitter.on('chat:receive', function(message) {
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

				// join first conversation in list
				$scope.join(_.find($scope.conversations));
			}

			$scope.sendMessage = function(event) {
				event.preventDefault();

				console.log($scope.replies[$scope.interactiveVisitor]);
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
