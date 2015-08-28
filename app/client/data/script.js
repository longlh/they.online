;(function() {
	'use strict';

	angular.module(APP).factory('/data/script', [
		'ENV',
		'/services/storage',
		function(ENV, storage) {
			var session = storage.get('session');
			var code = session.agent._id;

			var template = '!function(){var t="{{code}}",n="//{{host}}",c=function(t,n){var e=t.shift();if(!e)return n();var o=document.createElement("script");o.src=e,o.onload=function(){c(t,n)},document.body.appendChild(o)};c([n+"/socket.io/socket.io.js",n+"/public/js/client.js"],function(){they.online(n,t)})}();';

			template = template.replace('{{code}}', code);

			template = template.replace('{{host}}', ENV.host);

			return template;
		}
	]);
})();
