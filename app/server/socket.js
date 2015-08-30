'use strict';

exports._ = '/socket';
exports._requires = [
	'@bluebird',
	'@node-uuid',
	'@socket.io',
	'/http',
	'/chat'
];
exports._factory = function(Promise, UUID, io, httpServer, chat) {
	var socketServer = io(httpServer);

	// socket connected
	socketServer.on('connection', function(socket) {
		chat.handle(socket);

		// listen command
		socket.on('command', function(command) {
			// handle JOIN
			if (command.code === 'VISITOR_JOIN') {
				console.log('Visitor [' +
						command.data.visitor +
						'] connected with agent [' +
						command.data.agent +
						'], socket [' +
						socket.id +
						']');

				// join room
				socket.join(command.data.visitor + '_' + command.data.agent);
			} else if (command.code === 'AGENT_JOIN') {
				console.log('Agent [' +
						command.data.agent +
						'] is online, socket [' +
						socket.id +
						']');

				// join room
				socket.join(command.data.agent);
			} else if (command.code === 'CHAT') {
				var reply = {
					code: 'CHAT',
					from: socket.id,
					data: {
						id: UUID.v4(),
						chat: command.data.chat,
						agent: command.data.agent,
						visitor: command.data.visitor,
						from: command.data.from
					}
				};

				// boardcast to all visitor's devices
				socketServer.to(command.data.visitor + '_' + command.data.agent).emit('command', reply);

				// boardcast to agent
				socketServer.to(command.data.agent).emit('command', reply);
			}
		});

		// socket disconnected
		socket.on('disconnect', function() {
			console.log('[' +
					socket.id +
					'] disconnected');

			socket = null;
		});
	});

	return socketServer;
};
