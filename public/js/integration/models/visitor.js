;(function(di) {
	'use strict';

	di.register('/models/visitor', [
		'@local-storage',
		function(localStorage) {
			var visitor = {
				id: localStorage.visitorId
			};

			// check cookie or localstorge to determine current visitor
			if (!visitor.id) {
				localStorage.visitorId = visitor.id = Date.now();
			}

			return visitor;
		}
	]);

})(window.__('they.online'));
