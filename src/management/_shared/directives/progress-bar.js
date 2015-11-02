'use strict';

require('..').directive('progressBar', [
	'shared.services.template',
	function(template) {
		return {
			restrict: 'E',
			templateUrl: template('_shared/directives/progress-bar'),
			link: function(scope, el, attrs) {
				var mldProgressBar = el[0].querySelector('.mdl-progress');

				mldProgressBar.addEventListener('mdl-componentupgraded', function() {
					console.log('upgraded');

					// TODO handle event for show/hide + progress
				});
			}
		};
	}
]);
