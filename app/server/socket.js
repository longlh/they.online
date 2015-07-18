'use strict';

exports._ = '/server/socket';
exports._requires = [
	'@socket.io',
	'@bluebird',
	'/server/http'
];
exports._factory = function(socketIO, Promise, httpServer) {
	var io = socketIO(httpServer);

	io.on('connection', function(socket) {
		console.log('A user connected to server...', socket.id);

		socket.on('disconnect', function() {
			console.log('A user disconnected from server...');
			socket.broadcast.emit('message', {
				code: 'LEAVE',
				data: 'bye'
			});
		});

		socket.on('message', function(message) {
			// broadcast
			if (message.code === 'CHAT') {
				io.to(message.data.room).emit('message', {
					code: 'CHAT',
					data: message.data.chat,
					from: socket.id
				});

			} else if (message.code === 'JOIN') {
				console.log('[' +
						socket.id +
						'] requests joining room [' +
						message.data +
						']');

				// leave all joined rooms
				var leaves = socket.rooms.map(function(room) {
					console.log('[' +
							socket.id +
							'] is leaving room [' +
							room +
							']');

					return new Promise(function(resolve, reject) {
						socket.leave(room, function() {
							console.log('[' +
									socket.id +
									'] has left room [' +
									room +
									']');

							io.to(room).emit('message', {
								code: 'LEAVE',
								from: socket.id,
								data: room
							});

							resolve();
						});
					});
				});

				Promise.all(leaves).then(function() {
					socket.join(message.data, function() {
						console.log('[' +
								socket.id +
								'] has joined room [' +
								message.data +
								']');

						io.to(message.data).emit('message', {
							code: 'JOIN',
							from: socket.id,
							data: message.data
						});
					});

				});
			}
		});
	});

	return io;
};
