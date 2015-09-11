;(function(di) {
	'use strict';

	di.register('/services/emitter', [
		'@lodash',
		function(_) {
			function empty() {}

			function dehandler(target, event, handler) {
				if (!event || !handler) {
					return empty;
				}

				return function() {
					var handlers = this.handlers[event];

					if (_.isArray(handlers)) {
						_.pull(handlers, handler);
					}

					// clear pointers
					event = undefined;
					handlers = undefined;
					handler = undefined;
					target = undefined;
				}.bind(target);
			}

			var Emitter = function() {
				this.handlers = {};
				this.waiting = {};
			};

			var proto = Emitter.prototype;

			proto.on = function(event, handler) {
				if (!event || !_.isFunction(handler)) {
					return dehandler(this);
				}

				this.handlers[event] = this.handlers[event] || [];

				this.handlers[event].push(handler);

				if (this.waiting[event]) {
					var queue;
					while (!!(queue = this.waiting[event].shift())) {
						this.emit(event, queue.data);
					}
				}

				return dehandler(this, event, handler);
			};

			proto.emit = function(event, data) {
				var handlers = this.handlers[event];

				_.forEach(handlers, function(handler) {
					handler.call(this, data);
				}, this);

				var hasHandlers = handlers && handlers.length > 0;

				if (!hasHandlers) {
					this.waiting[event] = this.waiting[event] || [];
					this.waiting[event].push({
						data: data
					});
				}

				return hasHandlers;
			};

			return Emitter;
		}
	]);
})(window.__('they.online'));
