;(function() {
	'use strict';

	angular.module('easy-chat').factory('/services/socket', [
		function() {
			var socket = io();

			socket.on('disconnect', function() {
				console.warn('Disconnected.');
				console.log('Reconnecting...');
			});

			return socket;
		}
	]);
})();
