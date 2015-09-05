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

		if (info.agent) {
			onlineSockets = container.agents[info.agent];

			// remove the disconnected socket from agent's socket list
			_.pull(onlineSockets, socket.id);

			// if no socket remain, notify the agent is offline
			if (onlineSockets && onlineSockets.length === 0) {
				// TODO emit [command] agent:offline to conntected visitors
				// -> visitors must emit [command] visitor:online again
				var connectedVisitors = container.connections[info.agent];

				console.log('Must notify to Visitors', connectedVisitors);

				_.forEach(connectedVisitors, function(visitor) {
					console.log('Sockets: ', container.visitors[visitor]);
				});

				// clear data
				delete container.agents[info.agent];
				console.log('Agent [' + info.agent + '] is offline');

				_.pull(container.tenants[info.tenant], info.agent);

				if (container.tenants[info.tenant] && container.tenants[info.tenant].length === 0) {
					delete container.tenants[info.tenant];
				}

				container.agentDisconnect(info.agent);
			}
		} else if (info.visitor) {
			onlineSockets = container.visitors[info.visitor];

			// remove the disconnected socket from agent's socket list
			_.pull(onlineSockets, socket.id);

			// if no socket remain, notify the agent is offline
			if (onlineSockets && onlineSockets.length === 0) {
				// TODO emit [command] visitor:offline to connected agents
				console.log(container.connections);
				var connectedAgent = container.connections[info.visitor];

				console.log('Must notify to Agent [' + connectedAgent + ']');
				console.log('Sockets: ', container.agents[connectedAgent]);

				// clear data of offline visitor

				delete container.visitors[info.visitor];
				console.log('Visitor [' + info.visitor + '] is offline');

				// remove from connections
				container.visitorDisconnect(info.visitor);

				//remove from waiting list
				var waiting = container.waiting[info.tenant];

				_.pull(waiting, info.visitor);

				if (waiting && waiting.length === 0) {
					delete container.waiting[info.tenant];
				}
			}
		}
	});
};
