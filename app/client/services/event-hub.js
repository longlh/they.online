;(function() {
	'use strict';

	angular.module(APP).factory('/services/event-hub', [
		'/services/emitter',
		function(Emitter) {
			return new Emitter();
		}
	]);
})();
