'use strict';

exports._ = '/chat/instructions/offline';
exports._requires = [
	'@lodash',
	'/socket',
	'/chat/instructions',
	'/chat/container'
];
exports._factory = function(_, socketServer, instructions, container) {
	function agentOffline(socket, agent, tenant) {
		var onlineSockets = container.agents[agent];

		// remove the disconnected socket from agent's socket list
		_.pull(onlineSockets, socket.id);

		// if no socket remain, notify the agent is offline
		if (onlineSockets && onlineSockets.length === 0) {
			var connectedVisitors = container.connections[agent];

			_.forEach(connectedVisitors, function(visitor) {
				socketServer.to(visitor + '_' + tenant).emit('command', {
					code: 'agent:offline',
					data: {
						agent: agent,
						visitor: visitor
					}
				});
			});

			// clear data
			delete container.agents[agent];
			console.log('Agent [' + agent + '] is offline');

			_.pull(container.tenants[tenant], agent);

			if (container.tenants[tenant] && container.tenants[tenant].length === 0) {
				delete container.tenants[tenant];
			}

			container.agentDisconnect(agent);
		}
	}

	function visitorOffline(socket, visitor, tenant) {
		var onlineSockets = container.visitors[visitor];

		// remove the disconnected socket from agent's socket list
		_.pull(onlineSockets, socket.id);

		// if no socket remain, notify the agent is offline
		if (onlineSockets && onlineSockets.length === 0) {
			// emit [command] visitor:offline to connected agents
			console.log(container.connections);
			var connectedAgent = container.connections[visitor];

			socketServer.to(connectedAgent).emit('command', {
				code: 'visitor:offline',
				data: {
					visitor: visitor,
					agent: connectedAgent
				}
			});

			// clear data of offline visitor
			delete container.visitors[visitor];
			console.log('Visitor [' + visitor + '] is offline');

			// remove from connections
			container.visitorDisconnect(visitor);

			//remove from waiting list
			var waiting = container.waiting[tenant];

			_.pull(waiting, visitor);

			if (waiting && waiting.length === 0) {
				delete container.waiting[tenant];
			}
		}
	}

	instructions.set('offline', function(socket) {
		// get owner info of the disconnected socket
		var info = container.sockets[socket.id];
		delete container.sockets[socket.id];

		if (info.agent) {
			agentOffline(socket, info.agent, info.tenant);
		} else if (info.visitor) {
			visitorOffline(socket, info.visitor, info.tenant);
		}
	});
};
