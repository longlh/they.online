;(function() {
	'use strict';

	angular.module(APP).controller('/controllers/chat', [
		'$scope',
		'/services/event-emitter',
		'/services/chat',
		'/services/storage',
		function($scope, Emitter, chat, storage) {
			// force scope does dirty check
			var off = Emitter.on('message:receive', function() {
				console.log('xxx');
				$scope.$digest();
			});

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
			$scope.$on('$destroy', function() {
				Emitter.emit('agent:inactive');
				off();
			});

			// agent actives
			Emitter.emit('agent:active');
		}
	]);
})();
