;(function(di) {
	'use strict';

	di.register('/views/main', [
		'@ractive',
		'/services/http',
		'/views/container',
		'/data/env',
		function(Ractive, Http, container, env) {
			return Http.get(env.protocol + ':' + env.host + '/public/tpl/embed.tpl.html').then(function(template) {

				var ractive = new Ractive({
					el: container,
					template: template,
					data: {
						messages: [],
						unread: 1,
						hidden: true
					}
				});

				return ractive;
			});
		}
	]);
})(window.__('they.online'));
