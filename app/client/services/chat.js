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

			var conversations = self.conversations = [];
			var indexes = {};

			self.connect = function() {
				socket.emit('command', {
					code: 'AGENT_JOIN',
					data: {
						agent: session.agent._id
					}
				});

				// listen server
				socket.on('command', function(command) {
					if (command.code === 'CHAT') {
						var conversation = indexes[command.data.visitor];

						if (!conversation) {
							// TODO use class Visitor for better logic handling
							indexes[command.data.visitor] = conversation = new Conversation({
								id: command.data.visitor,
								name: 'Anonymous'
							}, session.agent._id);

							conversations.push(conversation);

							Emitter.emit('conversation:start', conversation);
						}

						// store message
						conversation.appendMessage(command.data);

						Emitter.emit('chat:receive', command.data);
					}
				});
			};

			self.sendMessage = function(visitor, message) {
				console.log(visitor, message);

				socket.emit('command', {
					code: 'CHAT',
					data: {
						agent: session.agent._id,
						chat: message,
						visitor: visitor,
						from: session.agent._id
					}
				});
			};

			return self;
		}
	]);
})();
