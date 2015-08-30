'use strict';

exports._ = '/chat';
exports._requires = [
	'/chat/container'
];
exports._factory = function(container) {
	var self = {};

	self.handle = function(socket) {
		socket.on('command', self.execute);
	};

	self.execute = function(command) {
		var socket = this;
		var instruction = instructions[command.code];

		if (instruction) {
			instruction.call(this, socket, command.data);
		}
	};

	self.agentOnline = function(socket, data) {
		console.log('AgentId: ' + data.agent);
	};

	var instructions = {
		'agent:online': self.agentOnline
	};

	return self;
};
