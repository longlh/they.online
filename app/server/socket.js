'use strict';

exports._ = '/socket';
exports._requires = [
	'@bluebird',
	'@node-uuid',
	'@socket.io',
	'/http'
];
exports._factory = function(Promise, UUID, socketIO, httpServer) {
	var io = socketIO(httpServer);

	// socket connected
	io.on('connection', function(socket) {
		// listen message
		socket.on('command', function(message) {
			// handle JOIN
			if (message.code === 'VISITOR_JOIN') {
				console.log('Visitor [' +
						message.data.visitor +
						'] connected with agent [' +
						message.data.agent +
						'], socket [' +
						socket.id +
						']');

				// join room
				socket.join(message.data.visitor + '_' + message.data.agent);
			} else if (message.code === 'AGENT_JOIN') {
				console.log('Agent [' +
						message.data.agent +
						'] is online, socket [' +
						socket.id +
						']');

				// join room
				socket.join(message.data.agent);
			} else if (message.code === 'CHAT') {
				var reply = {
					code: 'CHAT',
					from: socket.id,
					data: {
						id: UUID.v4(),
						chat: message.data.chat,
						agent: message.data.agent,
						visitor: message.data.visitor,
						from: message.data.from
					}
				};

				// boardcast to all visitor's devices
				io.to(message.data.visitor + '_' + message.data.agent).emit('command', reply);

				// boardcast to agent
				io.to(message.data.agent).emit('command', reply);
			}
		});

		// socket disconnected
		socket.on('disconnect', function() {
			console.log('[' +
					socket.id +
					'] disconnected');
		});
	});

	return io;
};
