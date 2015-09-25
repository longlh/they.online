'use strict';

exports._ = '/socket';
exports._requires = [
	'@bluebird',
	'@node-uuid',
	'@socket.io',
	'/http'
];
exports._activations = [
	'/chat'
];
exports._factory = function(Promise, UUID, io, httpServer) {
	var socketServer = io(httpServer);

	return socketServer;
};
