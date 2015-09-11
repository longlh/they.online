;(function(di) {
	'use strict';

	di.register('/main', [
		'/models/conversation',
		'/views/main',
		function(conversation, view) {
			view.on('message.send', function(event) {
				event.original.preventDefault();
				var message = view.get('message');

				conversation.append(message);

				view.set('message', undefined);

				return false;
			});

			view.on('hidden.toggle', function(event) {
				event.original.preventDefault();

				var hidden = view.get('hidden');

				view.set('hidden', !hidden);

				return false;
			});
		}
	], true);
})(window.__('they.online'));
