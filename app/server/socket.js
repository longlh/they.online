'use strict';

exports._ = '/server/socket';
exports._requires = [
	'@bluebird',
	'@node-uuid',
	'@socket.io',
	'/server/http'
];
exports._factory = function(Promise, UUID, socketIO, httpServer) {
	var io = socketIO(httpServer);

	io.on('connection', function(socket) {
		// listen message
		socket.on('message', function(message) {
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
						visitor: message.data.visitor
					}
				};

				// boardcast to all visitor's devices
				io.to(message.data.visitor + '_' + message.data.agent).emit('message', reply);

				// boardcast to agent
				io.to(message.data.agent).emit('message', reply);
			}
		});

		socket.on('disconnect', function() {
			console.log('[' +
					socket.id +
					'] disconnected');
		});
	});

	return io;
};
