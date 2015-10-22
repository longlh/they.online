'use strict';

require('..').directive('includeReplace', [
	'$rootScope',
	function($rootScope) {
		return {
			require: 'ngInclude',
			restrict: 'A',
			link: function(scope, el, attrs) {
				el.replaceWith(el.children());
			}
		};
	}
]);
