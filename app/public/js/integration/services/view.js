;(function(di) {
	'use strict';

	di.register('/services/view', [
		'@ractive',
		function(Ractive) {
			return function(template) {
				var ractive = new Ractive({
					el: document.body,
					template: template,
					data: {

					}
				});

				return ractive;
			};
		}
	]);
})(window.__('they.online'));
