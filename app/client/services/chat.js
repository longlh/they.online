;(function() {
	'use strict';

	angular.module('easy-chat').factory('/services/chat', [
		'/services/socket',
		'/services/storage',
		function(socket, storage) {
			// init socket
			socket.on('disconnect', function() {

			});

			socket.on('message', function(message) {
				// switch cases
			});

			var self = {};

			self.connect = function() {
				console.log('Connecting...');

				socket.on('connect', function() {
					console.log('Connected.');

					var agent = storage.get('session').data;

					socket.emit('message', {
						code: 'AGENT_JOIN',
						data: {
							agent: agent._id
						}
					});
				});
			};

			return self;
		}
	]);
})();
