;(function() {
	'use strict';

	angular.module('easy-chat').controller('/controllers/chat', [
		'$scope',
		'/services/event-emitter',
		'/services/chat',
		'/services/storage',
		function($scope, Emitter, chat, storage) {
			$scope.conversations = storage.get('conversations');
			$scope.replies = {};

			$scope.reply = function(visitor) {
				if (!$scope.replies[visitor]) {
					return;
				}

				chat.reply(visitor, $scope.replies[visitor]);

				$scope.replies[visitor] = '';
			};

			// agent actives
			Emitter.emit('agent:active');

			// agent inactives
			$scope.$on('$locationChangeStart', function() {
				Emitter.emit('agent:inactive');
			});

			Emitter.on('message:receive', function(message) {
				$scope.$digest();
			});
		}
	]);
})();
