;(function() {
	'use strict';

	angular.module('easy-chat').factory('/services/socket', [
		function() {
			var self = {};
			var socket;

			self.connect = function() {
				console.log('Socket connecting...');

				socket = io();

				socket.on('connect', function() {
					console.log('Connected', socket);
				});
			};

			self.send = function(data) {
				socket.emit('message', data);
			};

			self.listen = function(cb) {
				socket.on('message', cb);
			};

			return self;
		}
	]);
})();
