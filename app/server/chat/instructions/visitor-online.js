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
		var tenant = data.tenant;

		// check tenant
		var agent = container.getOnlineAgent(tenant);

		if (agent) {
			// connect two client
			socket.emit('command', {
				code: 'visitor:accept',
				data: {
					agent: agent
				}
			});
		} else {
			// add to waiting list
			container.wait(data.tenant, socket.id);
		}

		console.log(container);
	});
};
