;(function() {
	'use strict';
	angular.module(APP).constant('/services/template', function(template) {
		return '/app/views/' + template + '.html?' + Date.now();
	});

	angular.module(APP).constant('/services/partial', function(partial) {
		return '/app/components/' + partial + '.html?' + Date.now();
	});
})();
