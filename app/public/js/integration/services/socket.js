;(function(di) {
	'use strict';

	di.register('/services/socket', [
		'@socket.io',
		'/data/env',
		'/services/event-hub',
		function(io, env, eventHub) {
			var socket = io(env.host);

			socket.on('connect', function() {
				eventHub.emit('socket:connected');
			});

			return socket;
		}
	]);
})(window.__('they.online'));
