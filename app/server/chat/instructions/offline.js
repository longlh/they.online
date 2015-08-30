'use strict';

exports._ = '/chat/instructions/offline';
exports._requires = [
	'/chat/instructions'
];
exports._factory = function(instructions) {
	instructions.set('offline', function(socket) {
		/*
			TODO
			- find which agent or visitor disconnected using `socket.id`
		*/

		console.log('Socket [' + socket.id + '] disconnected');
	});
};
