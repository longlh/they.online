'use strict';

exports.name = '/chat/instructions';
exports.requires = [
	'@lodash'
];
exports.activations = [
	'/chat/instructions/agent-online',
	'/chat/instructions/visitor-online',
	'/chat/instructions/offline',
	'/chat/instructions/chat'
];
exports.factory = function(_) {
	var self = {
		instructions: {}
	};

	self.execute = function(command, socket, data) {
		var instruction = this.instructions[command];

		if (instruction) {
			instruction(socket, data);
		}
	};

	self.set = function(command, instruction) {
		if (_.isFunction(instruction)) {
			self.instructions[command] = instruction;
		}
	};

	return self;
};
