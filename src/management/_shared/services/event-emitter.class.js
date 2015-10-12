'use strict';

var EventEmitter = require('eventemitter3');
var util = require('util');

require('..').factory('shared.services.event-emitter', [
	function() {
		function Emitter() {}

		util.inherits(Emitter, EventEmitter);

		return Emitter;
	}
]);
