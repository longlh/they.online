;(function(di) {
	'use strict';

	di.register('/services/chat', [
		'/services/event-hub',
		'/services/socket',
		'/data/env',
		'/models/conversation',
		'/models/visitor',
		function(eventHub, socket, env, conversation, visitor) {
			function requestAgent() {
				socket.emit('command', {
					code: 'visitor:online',
					data: {
						visitor: visitor.id,
						tenant: env.tenant
					}
				});
			}

			eventHub.on('socket:connected', requestAgent);

			socket.on('command', function(command) {
				if (command.code === 'chat:bound') {
					console.log(visitor.id === command.data.from);

					conversation.parseCommand(command);

					// conversation.append(command.data.chat);
				} else if (command.code === 'agent:offline') {
					env.agent = undefined;
					requestAgent();
				} else if (command.code === 'agent:online') {
					console.log(command);
					env.agent = command.data.agent;
				}
			});

			socket.on('disconnect', function() {
				env.agent = undefined;
			});
		}
	], true);

})(window.__('they.online'));
