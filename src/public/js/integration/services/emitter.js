;(function(di) {
	'use strict';

	di.register('/services/emitter', [
		'@lodash',
		function(_) {
			function empty() {}

			function dehandle(target, event, handler) {
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
					return dehandle(this);
				}

				this.handlers[event] = this.handlers[event] || [];

				this.handlers[event].push(handler);

				if (this.waiting[event]) {
					var reEmit;

					while (!!(reEmit = this.waiting[event].shift())) {
						this.emit(event, reEmit.data);
					}
				}

				return dehandle(this, event, handler);
			};

			proto.emit = function(event, data, delay) {
				var handlers = this.handlers[event];

				_.forEach(handlers, function(handler) {
					handler.call(this, data);
				}, this);

				var hasHandlers = handlers && handlers.length > 0;

				if (delay && !hasHandlers) {
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
