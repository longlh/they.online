;(function(di) {
	'use strict';

	di.register('/models/conversation', [
		'/views/main',
		function(view) {
			var messages = [];

			// bind
			view.set('messages', messages);

			return {
				append: function(message) {
					messages.push({
						content: message
					});
				}
			};
		}
	]);
})(window.__('they.online'));
