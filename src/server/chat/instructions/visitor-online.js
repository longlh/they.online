'use strict';

exports._ = '/chat/instructions/visitor-online';
exports._requires = [
	'@lodash',
	'/socket',
	'/chat/instructions',
	'/chat/container'
];
exports._factory = function(_, socketServer, instructions, container) {
	instructions.set('visitor:online', function(socket, data) {
		// join rooms
		// 1. {visitor}_{tenant}: all sockets in conversation of a visitor with a tenant
		socket.join(data.visitor + '_' + data.tenant);

		container.socketConnect(socket.id, {
			visitor: data.visitor,
			tenant: data.tenant
		});

		var firstSocket = container.visitorOnline(socket.id, data.visitor);

		if (firstSocket) {
			console.log('Visitor [' + data.visitor + '] is online');

			var agent = container.getOnlineAgent(data.tenant);

			if (agent) {
				// connect visitor with agent
				container.connect(agent, data.visitor);

				// notify to the visitor
				socketServer.to(data.visitor + '_' + data.tenant).emit('command', {
					code: 'agent:online',
					data: {
						agent: agent,
						visitor: data.visitor
					}
				});

				// notify to the agent
				socketServer.to(agent).emit('command', {
					code: 'visitor:online',
					data: {
						agent: agent,
						visitor: data.visitor
					}
				});
			} else {
				// add to wait list
				container.wait(data.tenant, data.visitor);
			}
		} else {
			console.log('Visitor [' + data.visitor + '] is online, just activated new client');

			// get current connections state
			var connectedAgent = container.connections[data.visitor];

			if (connectedAgent) {
				// connect with the agent
				console.log('Connecting with Agent [' + connectedAgent + ']');

				socket.emit('command', {
					code: 'agent:online',
					data: {
						agent: connectedAgent,
						visitor: data.visitor
					}
				});
			}
		}
	});
};
