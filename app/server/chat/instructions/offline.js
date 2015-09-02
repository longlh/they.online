'use strict';

exports._ = '/chat/instructions/offline';
exports._requires = [
	'@lodash',
	'/chat/instructions',
	'/chat/container'
];
exports._factory = function(_, instructions, container) {
	instructions.set('offline', function(socket) {
		/*
			TODO
			- find which agent or visitor disconnected using `socket.id`
		*/

		// get owner info of the disconnected socket
		var info = container.sockets[socket.id];
		delete container.sockets[socket.id];
		var onlineSockets;

		console.log(info);

		if (info.agent) {
			onlineSockets = container.agents[info.agent];

			// remove the disconnected socket from agent's socket list
			_.pull(onlineSockets, socket.id);

			// if no socket remain, notify the agent is offline
			if (onlineSockets.length === 0) {
				console.log('Agent [' + info.agent + '] is offline');

				_.pull(container.tenants[info.tenant], info.agent);

				container.agentDisconnect(info.agent);

				// TODO emit [command]visitor:offline to visitors
			}
		} else if (info.visitor) {
			onlineSockets = container.visitors[info.visitor];

			// remove the disconnected socket from agent's socket list
			_.pull(onlineSockets, socket.id);

			// if no socket remain, notify the agent is offline
			if (onlineSockets.length === 0) {
				console.log('Visitor [' + info.visitor + '] is offline');

				// remove from connections
				container.visitorDisconnect(info.visitor);

				// if (container.connnections[connectedAgent].length === 0) {
				// 	delete container.connections[connectedAgent];
				// }

				console.log(container.connections);

				// TODO emit [command] visitor:offline to agents
			}
		}
	});
};
