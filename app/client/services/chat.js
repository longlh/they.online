;(function() {
	'use strict';

	function reply(socket, storage) {
		return function(visitor, message) {
			socket.emit('message', {
				code: 'CHAT',
				data: {
					visitor: visitor,
					agent: storage.get('session').data._id,
					chat: message
				}
			});
		};
	}

	function handleDisconnect() {

	}

	function handleMessage(Emitter, Conversation, conversations) {
		return function(message) {
			// switch cases
			if (message.code === 'CHAT') {
				conversations[message.data.visitor] = conversations[message.data.visitor] || new Conversation(message.data.visitor);

				conversations[message.data.visitor].push(message);
				Emitter.emit('message:receive', message);
			}
		};
	}

	function connect(socket, storage) {
		return function() {
			console.log('Connecting...');

			socket.on('connect', function() {
				console.log('Connected! Join channel.');

				var agent = storage.get('session').data;

				socket.emit('message', {
					code: 'AGENT_JOIN',
					data: {
						agent: agent._id
					}
				});
			});
		};
	}

	angular.module(APP).factory('/services/chat', [
		'/models/conversation',
		'/services/event-emitter',
		'/services/socket',
		'/services/storage',
		function(Conversation, Emitter, socket, storage) {
			var conversations = {};

			storage.put('conversations', conversations);

			// init socket
			socket.on('disconnect', handleDisconnect);

			socket.on('message', handleMessage(Emitter, Conversation, conversations));

			var self = {};

			self.connect = connect(socket, storage);

			self.reply = reply(socket, storage);

			return self;
		}
	]);
})();
