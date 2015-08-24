;(function() {
	'use strict';

	angular.module(APP).factory('/services/chat', [
		'/models/conversation',
		'/services/event-emitter',
		'/services/socket',
		'/services/storage',
		function(Conversation, Emitter, socket, storage) {
			var session = storage.get('session');
			var self = {};

			var conversations = self.conversations = {};

			self.connect = function() {
				socket.emit('message', {
					code: 'AGENT_JOIN',
					data: {
						agent: session.agent._id
					}
				});

				// listen server
				socket.on('message', function(command) {
					console.log(command);
					if (command.code === 'CHAT') {
						var conversation = conversations[command.data.visitor];

						if (!conversation) {
							// TODO use class Visitor for better logic handling
							conversations[command.data.visitor] = conversation = new Conversation({
								id: command.data.visitor,
								name: 'Anonymous'
							});

							Emitter.emit('conversation:start', conversation);
						}

						// store message
						conversation.appendMessage(command.data);

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
