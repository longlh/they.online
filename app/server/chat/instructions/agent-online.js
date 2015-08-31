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
			console.log(container.waiting[agent.tenant]);

			_.forEach(container.waiting[agent.tenant], function(waitingSocket) {
				socketServer.to(waitingSocket).emit('command', {
					code: 'visitor:accept',
					data: {
						agent: agent._id
					}
				});
			});
		});
	});
};
