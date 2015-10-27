'use strict';

var EventEmitter = require('eventemitter3');
// var util = require('util');

require('..').factory('shared.services.event-emitter', [
	function() {
		function Emitter() {
			this._internal = new EventEmitter();
		}

		Emitter.prototype.on = function(event, cb) {
			this._internal.on(event, cb);

			return function() {
				this._internal.removeListener(event, cb);
			}.bind(this);
		};

		Emitter.prototype.emit = function(event, data) {
			this._internal.emit(event, data);
		};

		return Emitter;
	}
]);
