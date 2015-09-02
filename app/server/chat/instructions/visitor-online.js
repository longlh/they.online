'use strict';

exports._ = '/chat/instructions/visitor-online';
exports._requires = [
	'@lodash',
	'/chat/instructions',
	'/chat/container',
	'/socket'
];
exports._factory = function(_, instructions, container, socketServer) {
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
		container.visitors[data.visitor] = container.visitors[data.visitor] || [];

		container.visitors[data.visitor].push(socket.id);

		if (container.visitors[data.visitor].length === 1) {
			console.log('Visitor [' + data.visitor + '] is online');

			var agent = container.getOnlineAgent(data.tenant);

			if (agent) {
				// connect with the online agent
				console.log('Agent online');
				container.connect(agent, data.visitor);
			} else {
				// add to wait list
				container.wait(data.tenant, data.visitor);
				console.log('Agent offline');
				console.log(container.waiting);
			}

			// TODO emit [command] visitor:online to agent
		}

		console.log(container);
	});
};
