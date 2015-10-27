'use strict';

module.exports = require('angular').module('socket', [
	require('angular-ui-router')
]).run([
	'socket.services.connection',
	function(connection) {
		// force connection initialize
	}
]);
