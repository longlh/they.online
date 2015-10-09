;(function() {
	'use strict';
	angular.module(APP).constant('/services/template', function(template) {
		return '/src/views/' + template + '.tpl.html?' + Date.now();
	});

	angular.module(APP).constant('/services/partial', function(partial) {
		return '/src/components/' + partial + '.tpl.html?' + Date.now();
	});
})();
