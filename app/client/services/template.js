;(function() {
	'use strict';
	angular.module('easy-chat').constant('/services/template', function(templateName) {
		return '/app/views/' + templateName + '.html?' + Date.now();
	});
})();
