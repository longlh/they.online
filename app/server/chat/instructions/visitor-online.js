'use strict';

exports._ = '/chat/instructions/visitor-online';
exports._requires = [
	'/chat/instructions'
];
exports._factory = function(instructions) {
	instructions.set('visitor:online', function(socket, data) {
		/*
			TODO
			- find tenant by `data.tenant`
			- check tenant.onlineAgents
				- if no agent online -> push to waiting visitors
				- if agents online -> connect with this tenant -> return `visitor:connected`
		*/
		socket.join(data.visitor + '_' + data.agent);
	});
};
