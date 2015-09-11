;(function(di) {
	'use strict';

	di.register('/views/container', [
		'/data/env',
		function(env) {
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = env.host + '/build/css/client.css';

			document.body.appendChild(link);

			var container = document.createElement('div');
			container.className = 'they-online-client';

			document.body.appendChild(container);

			return container;
		}
	]);
})(window.__('they.online'));
