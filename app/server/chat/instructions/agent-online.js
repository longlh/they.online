'use strict';

exports._ = '/chat/instructions/agent-online';
exports._requires = [
	'@lodash',
	'/models/agent',
	'/chat/instructions',
	'/chat/container',
	'/socket'
];
exports._factory = function(_, Agent, instructions, container, socketServer) {
	instructions.set('agent:online', function(socket, data) {
		/*
			TODO
			- find agent by `data.agent`
			- push socket to agent.sockets
			- find tenant by agent.tenant
			- push agent to tenant.onlineAgents
			- notify all tenant's waiting visitors that an agent online
		*/

		Agent.findById(data.agent).exec(function(err, agent) {
			container.sockets = container.sockets || {};

			container.sockets[socket.id] = {
				agent: agent.id,
			};

			container.agents = container.agents || {};
			container.agents[agent.id] = container.agents[agent.id] || [];

			container.agents[agent.id].push(socket.id);

			if (container.agents[agent.id].length === 1) {
				console.log('Agent [' + agent.id + '] is online');
			}
		});
	});
};
