'use strict';

exports.name = '/socket';
exports.requires = [
	'@bluebird',
	'@node-uuid',
	'@socket.io',
	'/http'
];
exports.activations = [
	'/chat'
];
exports.factory = function(Promise, UUID, io, httpServer) {
	var socketServer = io(httpServer);

	return socketServer;
};
