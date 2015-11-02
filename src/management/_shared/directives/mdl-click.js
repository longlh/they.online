'use strict';

require('..').directive('mdlClick', [
	function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				function scopeEval() {
					scope.$eval(attrs.mdlClick);
				}

				element[0].addEventListener('click', scopeEval);

				scope.$on('$destroy', function() {
					element[0].removeEventListener('click', scopeEval);
					element.length = 0;
				});
			}
		};
	}
]);
