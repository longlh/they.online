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
		container.sockets = container.sockets || {};
		container.sockets[socket.id] = {
			visitor: data.visitor
		};

		container.visitors = container.visitors || {};
		container.visitors[data.visitor] = container.visitors[data.visitor] || [];

		container.visitors[data.visitor].push(socket.id);

		if (container.visitors[data.visitor].length === 1) {
			console.log('Visitor [' + data.visitor + '] is online');
		}
	});
};
