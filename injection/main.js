'use strict';

they.online.factory('main', [
	'@env',
	'/services/http',
	function(env, http) {
		http.get(env.protocol + ':' + env.host + '/public/tpl/embed.tpl.html').then(function(html) {
			console.log(html);
		});
	}
]);
