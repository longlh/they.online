;(function(di) {
	'use strict';

	di.register('/services/socket', [
		'@socket.io',
		'/data/env',
		function(io, env) {
			console.log('x');

			var socket = io(env.host);

			console.log(socket);

			return socket;
		}
	]);
})(window.__('they.online'));
