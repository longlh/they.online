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
		var onlineSockets;

		if (info.agent) {
			onlineSockets = container.agents[info.agent];

			// remove the disconnected socket from agent's socket list
			_.pull(onlineSockets, socket.id);

			// if no socket remain, notify the agent is offline
			if (onlineSockets.length === 0) {
				console.log('Agent [' + info.agent + '] is offline');
			}
		} else if (info.visitor) {
			onlineSockets = container.visitors[info.visitor];

			// remove the disconnected socket from agent's socket list
			_.pull(onlineSockets, socket.id);

			// if no socket remain, notify the agent is offline
			if (onlineSockets.length === 0) {
				console.log('Visitor [' + info.visitor + '] is offline');
			}
		}
	});
};
