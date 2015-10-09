;(function() {
	'use strict';

	angular.module(APP).factory('/services/socket', [
		'@io',
		function(io) {
			var socket = io();

			// handle common tasks here
			socket.on('disconnect', function() {
				console.warn('Disconnected.');
				console.log('Reconnecting...');
			});

			return socket;
		}
	]);
})();
