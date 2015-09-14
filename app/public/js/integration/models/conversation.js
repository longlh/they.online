;(function(di) {
	'use strict';

	di.register('/models/conversation', [
		'/views/main',
		'/models/visitor',
		function(view, visitor) {
			// internal storage
			var _messages = [];

			// bind
			view.set('messages', _messages);

			var self = {};

			self.parseCommand = function(command) {
				var message = {
					self: visitor.id === command.data.from,
					content: command.data.chat
				};

				self.append(message);
			};

			self.append =  function(message) {
				_messages.push(message);
			};

			return self;
		}
	]);
})(window.__('they.online'));
