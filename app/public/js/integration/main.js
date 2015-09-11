;(function(di) {
	'use strict';

	di.register('/main', [
		'/views/main',
		'/services/socket',
		'/data/env',
		'/models/visitor',
		function(view, socket, env, visitor) {
			view.on('message.send', function(event) {
				event.original.preventDefault();
				var message = view.get('message');

				socket.emit('command', {
					code: 'chat',
					data: {
						visitor: visitor.id,
						tenant: env.tenant,
						agent: env.agent,
						chat: message,
						from: visitor.id
					}
				});

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
