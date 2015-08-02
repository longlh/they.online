;(function() {
	'use strict';

	angular.module('easy-chat').factory('/services/chat', [
		'/services/event-emitter',
		'/services/socket',
		'/services/storage',
		function(Emitter, socket, storage) {
			function join() {
				console.log('Connected! Join channel.');

				var agent = storage.get('session').data;

				socket.emit('message', {
					code: 'AGENT_JOIN',
					data: {
						agent: agent._id
					}
				});
			}

			// init socket
			socket.on('disconnect', function() {

			});

			socket.on('message', function(message) {
				// switch cases
				Emitter.emit('message', message);
			});

			var self = {};

			self.connect = function() {
				console.log('Connecting...');

				socket.on('connect', join);
			};

			self.reply = function(visitor, message) {
				socket.emit('message', {
					code: 'CHAT',
					data: {
						visitor: visitor,
						agent: storage.get('session').data._id,
						chat: message
					}
				});
			};

			return self;
		}
	]);
})();
