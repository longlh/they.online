;(function() {
	'use strict';

	angular.module(APP).factory('/services/chat', [
		'/models/conversation',
		'/services/event-hub',
		'/services/command',
		'/services/socket',
		'/services/storage',
		function(Conversation, EventHub, command, socket, storage) {
			var session = storage.get('session');
			var self = {};

			var conversations = self.conversations = [];
			var indexes = {};

			self.connect = function() {
				command.ready(function() {
					command.send('agent:online', {
						agent: session.agent._id
					});
				});

				command.receive(function(command) {
					console.log(command);

					if (command.code === 'chat:bound') {
						var data = command.data;
						var visitor = data.visitor;

						var conversation = indexes[visitor];

						if (!conversation) {
							indexes[visitor] = conversation = new Conversation({
								id: visitor,
								name: 'Anonymous'
							}, session.agent._id);

							conversations.push(conversation);

							EventHub.emit('conversation:start', conversation);
						}

						// store message
						conversation.appendMessage(data);

						// emit
						EventHub.emit('chat:receive', command.data);
					} else if (command.code === 'visitor:online') {
						console.log('Visitor online', command.data);
					} else if (command.code === 'visitor:offline') {
						console.log('Visitor offline', command.data);
					}
				});
			};

			self.sendMessage = function(visitor, message) {
				command.send('chat', {
					agent: session.agent._id,
					chat: message,
					visitor: visitor,
					from: session.agent._id
				});
			};

			return self;
		}
	]);
})();
