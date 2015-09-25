;(function(exports) {
	'use strict';

	var tenant = '55e03f6a0d50b0500d070fb7';
	var host = '//dev.they.online';

	var scripts = [
		host + '/socket.io/socket.io.js',
		host + '/lib/lodash/lodash.min.js',
		host + '/lib/ractive/ractive.min.js',
		host + '/lib/bluebird/js/browser/bluebird.min.js',
		host + '/public/js/di.js',
		host + '/public/js/integration/main.js',
		host + '/public/js/integration/import.js',
		host + '/public/js/integration/models/conversation.js',
		host + '/public/js/integration/models/visitor.js',
		host + '/public/js/integration/services/chat.js',
		host + '/public/js/integration/services/emitter.js',
		host + '/public/js/integration/services/event-hub.js',
		host + '/public/js/integration/services/http.js',
		host + '/public/js/integration/services/socket.js',
		host + '/public/js/integration/views/main.js',
		host + '/public/js/integration/views/container.js'
	];

	function load(scripts, done) {
		var script = scripts.shift();

		if (!script) {
			scripts = undefined;
			return done();
		}

		var tag = document.createElement('script');
		tag.src = script;
		tag.onload = function() {
			load(scripts, done);
		};

		document.body.appendChild(tag);

		// clear pointers
		tag = undefined;
	}

	load(scripts, function() {
		if (typeof window.__ !== 'undefined') {
			window.__('they.online').register('/data/env', {
				protocol: 'http',
				tenant: tenant,
				host: host
			}).bootstrap();
		}
	});
})(window);
