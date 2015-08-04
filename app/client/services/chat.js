;(function() {
	'use strict';

	angular.module(APP).factory('/services/chat', [
		'/models/conversation',
		'/services/event-emitter',
		'/services/socket',
		'/services/storage',
		function(Conversation, Emitter, socket, storage) {
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

			var conversations = {};

			storage.put('conversations', conversations);

			// init socket
			socket.on('disconnect', function() {

			});

			socket.on('message', function(message) {
				// switch cases
				if (message.code === 'CHAT') {
					conversations[message.data.visitor] = conversations[message.data.visitor] || new Conversation(message.data.visitor);

					conversations[message.data.visitor].push(message);
					Emitter.emit('message:receive', message);
				}
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
