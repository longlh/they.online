'use strict';

var io = require('socket.io-client');

require('..').factory('socket.services.connection', [
	function() {
		var socket = io();

		socket.on('connect', function() {
			console.log(socket.id);
		});

		return socket;
	}
]);
