'use strict';

exports._ = '/chat/instructions/agent-online';
exports._requires = [
	'@lodash',
	'@bluebird',
	'/models/agent',
	'/socket',
	'/chat/instructions',
	'/chat/container'
];
exports._factory = function(_, Promise, Agent, socketServer, instructions, container) {
	instructions.set('agent:online', function(socket, data) {
		var query = Agent.findById(data.agent);

		Promise.resolve(query.exec()).then(function(agent) {
			if (!agent) {
				return Promise.reject(new Error('Agent no found!'));
			}

			// join rooms
			// 1. {agent}: all sockets of an agent
			socket.join(agent.id);

			container.socketConnect(socket.id, {
				agent: agent.id,
				tenant: agent.tenant
			});

			var firstSocket = container.agentOnline(socket.id, agent.id, agent.tenant);

			if (firstSocket) {
				console.log('Agent [' + agent.id + '] is online');

				var waitingVisitors = container.waiting[agent.tenant];

				// connect & emit [command] agent:online to tenant's waiting visitors
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

		}).catch(function(err) {
			console.error(err);
		});
	});
};
