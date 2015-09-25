;(function(di) {
	'use strict';

	di.register('/services/event-hub', [
		'/services/emitter',
		function(Emitter) {
			return new Emitter();
		}
	]);
})(window.__('they.online'));
