;(function() {
	'use strict';

	angular.module(APP).factory('/services/chat', [
		'/services/event-emitter',
		'/services/socket',
		'/services/storage',
		function(Emitter, socket, storage) {
			var session = storage.get('session');
			var self = {};

			var visitors = self.visitors = {};

			self.connect = function() {
				socket.emit('message', {
					code: 'AGENT_JOIN',
					data: {
						agent: session.agent._id
					}
				});

				// listen server
				socket.on('message', function(command) {
					if (command.code === 'CHAT') {
						var visitor = visitors[command.data.visitor];

						if (!visitor) {
							// TODO use class Visitor for better logic handling
							visitors[command.data.visitor] = visitor = {
								name: 'Anonymous',
								messages: []
							};

							Emitter.emit('visitor:join', visitor);
						}

						// store message
						visitor.messages.push(command.data);

						Emitter.emit('chat:receive', command.data);
					}
				});
			};

			self.sendMessage = function(visitor, message) {

			};

			return self;
		}
	]);
})();
