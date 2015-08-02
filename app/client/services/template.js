;(function() {
	'use strict';
	angular.module('easy-chat').constant('/services/template', function(template) {
		return '/app/views/' + template + '.html?' + Date.now();
	});

	angular.module('easy-chat').constant('/services/partial', function(partial) {
		return '/app/components/' + partial + '.html?' + Date.now();
	});
})();
