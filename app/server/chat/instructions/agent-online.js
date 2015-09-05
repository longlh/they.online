'use strict';

exports._ = '/chat/instructions/agent-online';
exports._requires = [
	'@lodash',
	'/models/agent',
	'/socket',
	'/chat/instructions',
	'/chat/container'
];
exports._factory = function(_, Agent, socketServer, instructions, container) {
	instructions.set('agent:online', function(socket, data) {
		/*
			TODO
			- find agent by `data.agent`: done
			- push socket to agent.sockets: done
			- mark agent as online: done
			- notify all tenant's waiting visitors that an agent online
		*/

		Agent.findById(data.agent).exec(function(err, agent) {
			container.sockets = container.sockets || {};

			container.sockets[socket.id] = {
				agent: agent.id,
				tenant: agent.tenant
			};

			container.agents = container.agents || {};
			container.agents[agent.id] = container.agents[agent.id] || [];

			container.agents[agent.id].push(socket.id);

			if (container.agents[agent.id].length === 1) {
				console.log('Agent [' + agent.id + '] is online');

				container.tenants = container.tenants || {};
				container.tenants[agent.tenant] = container.tenants[agent.tenant] || [];
				container.tenants[agent.tenant].push(agent.id);

				// TODO emit [command] agent:online to tenant's waiting list
				var waitingVisitors = container.waiting[agent.tenant];

				// connect with waiting visitors
				_.forEach(waitingVisitors, function(visitor) {
					container.connect(agent.id, visitor);

					socketServer.to(visitor + '_' + agent.tenant).emit('command', {
						code: 'agent:online',
						data: {
							agent: agent.id,
							visitor: visitor
						}
					});
				});

				// remove waiting list
				if (waitingVisitors) {
					waitingVisitors.length = 0;
				}

				delete container.waiting[agent.tenant];
			} else {
				console.log('Agent [' + agent.id + '] is online, just activated new client.');
			}

			// join rooms
			// 1. {agent}: all sockets of an agent
			socket.join(agent.id);
		});
	});
};
