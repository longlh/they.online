;(function() {
	'use strict';

	angular.module(APP).controller('/controllers/chat', [
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

				// reset checkbox after send reply
				$scope.replies[visitor] = '';
			};

			// agent inactives
			$scope.$on('$locationChangeStart', function() {
				Emitter.emit('agent:inactive');
			});

			// force scope does dirty check
			Emitter.on('message:receive', function(message) {
				$scope.$digest();
			});

			// agent actives
			Emitter.emit('agent:active');
		}
	]);
})();
