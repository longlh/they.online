'use strict';

exports._ = '/server/socket';
exports._requires = [
	'@socket.io',
	'/server/http'
];
exports._factory = function(socketIO, httpServer) {
	var socketServer = socketIO(httpServer);

	socketServer.on('connection', function(socket) {
		console.log('A user connected to server...', socket.id);
		// console.dir(socket);

		socket.broadcast.emit('message', {
			code: 'JOIN',
			data: 'hi'
		});

		socket.on('disconnect', function() {
			console.log('A user disconnected from server...');
			socket.broadcast.emit('message', {
				code: 'LEAVE',
				data: 'bye'
			});
		});

		socket.on('message', function(message) {
			console.log(message);

			// broadcast
			if (message.code === 'CHAT') {
				socket.broadcast.emit('message', message);
			}
		});
	});

	return socketServer;
};
