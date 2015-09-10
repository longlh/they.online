;(function(di) {
	'use strict';

	di.register('/main', [
		'/data/env',
		'/services/http',
		'/services/view',
		function(env, http, view) {
			http.get(env.protocol + ':' + env.host + '/public/tpl/embed.tpl.html').then(function(template) {
				console.log(template);

				view(template);
			});
		}
	], true);
})(window.__('they.online'));
