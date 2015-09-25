'use strict';

exports._ = '/chat';
exports._requires = [
	'/socket',
	'/chat/container',
	'/chat/instructions'
];
exports._factory = function(socketServer, container, instructions) {
	var self = {
		execute: function(command) {
			var socket = this;
			instructions.execute(command.code, socket, command.data);
		},
		disconnect: function() {
			var socket = this;

			instructions.execute('offline', socket);
		}
	};

	// socket connected
	socketServer.on('connection', function(socket) {
		// listen command
		socket.on('command', self.execute);

		socket.on('disconnect', self.disconnect);
	});
};
