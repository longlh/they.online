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
		/*
			FIXME
			Use socket.io room instead of array & hash object
		*/

		/*
			TODO
			- find tenant by `data.tenant`
			- check tenant.onlineAgents
				- if no agent online -> push to waiting visitors
				- if agents online -> connect with this tenant -> return `visitor:connected`
		*/
		container.sockets = container.sockets || {};
		container.sockets[socket.id] = {
			visitor: data.visitor,
			tenant: data.tenant
		};

		container.visitors = container.visitors || {};
		var sockets = container.visitors[data.visitor] = container.visitors[data.visitor] || [];

		// prevent dupplicate when visitor reconnect
		_.pull(sockets, socket.id);

		var firstSocket = sockets.length === 0;

		sockets.push(socket.id);

		if (firstSocket) {
			console.log('Visitor [' + data.visitor + '] is online');

			var agent = container.getOnlineAgent(data.tenant);

			if (agent) {
				// connect with the online agent
				console.log('Agent online');
				container.connect(agent, data.visitor);

				socket.emit('command', {
					code: 'agent:online',
					data: {
						agent: agent,
						visitor: data.visitor
					}
				});
			} else {
				// add to wait list
				container.wait(data.tenant, data.visitor);
				console.log('Agent offline, waiting...');
			}

			// TODO emit [command] visitor:online to agent
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
			} else {
				console.log('Still waiting...');
			}
		}

		// join rooms
		// 1. {visitor}_{tenant}: all sockets in conversation of a visitor with a tenant
		socket.join(data.visitor + '_' + data.tenant);

		// clear pointers
		sockets = null;
	});
};
