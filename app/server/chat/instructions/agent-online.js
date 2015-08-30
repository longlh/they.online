'use strict';

exports._ = '/chat/instructions/agent-online';
exports._requires = [
	'/models/agent',
	'/chat/instructions',
	'/chat/container',
];
exports._factory = function(Agent, instructions, container) {
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
			console.log(agent);
		});
	});
};
