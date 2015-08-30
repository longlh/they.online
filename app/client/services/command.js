;(function() {
	'use strict';

	angular.module(APP).factory('/services/command', [
		'/services/socket',
		function(socket) {
			var self = {};

			self.ready = function(ready) {
				socket.on('connect', ready);
			};

			self.receive = function(handler) {
				return socket.on('command', handler);
			};

			self.send = function(code, data) {
				socket.emit('command', {
					code: code,
					data: data
				});
			};

			return self;
		}
	]);
})();
