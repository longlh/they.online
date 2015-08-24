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
				Emitter.on('visitor:join', function(visitor) {
					if (!$scope.interactiveVisitor) {
						$scope.interact(visitor);
					}

					$scope.$digest();
				});

				Emitter.on('chat:receive', function() {
					$scope.$digest();
				});
			}

			$scope.visitors = chat.visitors;
			$scope.messages = [];
			$scope.replies = {};
			$scope.interactiveVisitor = null;

			for (var i = 0; i < 10; i++) {
				$scope.messages.push({
					content: 'xxxxxxxxxxxxxxxasdasdddddddddddddddd - ' + i,
					self: i % 3 === 0,
					id: i
				});
			}

			$scope.sendMessage = function(event) {
				event.preventDefault();

				console.log($scope.replies[$scope.interactiveVisitor]);
			};

			$scope.interact = function(visitor) {
				$scope.interactiveVisitor = visitor;
			};

			activate();
		}
	]);
})();
