;(function() {
	'use strict';

	angular.module('easy-chat').controller('/controllers/chat', [
		'$scope',
		'/services/event-emitter',
		function($scope, Emitter) {
			Emitter.emit('agent:active');

			$scope.$on('$locationChangeStart', function() {
				Emitter.emit('agent:inactive');
			});

			Emitter.on('message:receive', function(message) {
				console.log(message);
			});
		}
	]);
})();
