;(function() {
	'use strict';

	angular.module(APP).factory('/services/emitter', [
		'@lodash',
		function(_) {
			var Emitter = function() {
				this.handlers = {};
			};

			var proto = Emitter.prototype;

			proto.createDehandler = function(event, handler) {
				return function() {
					var handlers = this.handlers[event];

					if (_.isArray(handlers)) {
						_.pull(handlers, handler);

						if (handlers.length === 0) {
							delete this.handlers[event];
						}
					}

					event = null;
					handlers = null;
					handler = null;
				}.bind(this);
			};

			proto.dispose = function() {
				this.handlers = null;
			};

			proto.on = function(event, handler) {
				if (!event || !_.isFunction(handler)) {
					return this.createDehandler();
				}

				// init handlers container first time
				this.handlers[event] = this.handlers[event] || [];

				this.handlers[event].push(handler);

				return this.createDehandler(event, handler);
			};

			proto.emit = function(event, data) {
				var handlers = this.handlers[event];

				_.forEach(handlers, function(handler) {
					handler.call(this, data);
				}, this);

				return !!handlers;
			};

			return Emitter;
		}
	]);
})();
