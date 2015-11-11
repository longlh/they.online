'use strict';

require('..').directive('switchIcon', [
	'shared.services.template', '$document',
	function(template, $document) {
		return {
			restrict: 'E',
			templateUrl: template('_shared/directives/switch-icon'),
			link: function(scope, el, attrs) {

				function switchIconSave(status) {
					var icon;

					switch (status) {
						case 'processing':
							icon = 'autorenew';
							break;

						case 'success':
							icon = 'done';
							break;

						case 'error':
							icon = 'error';
							break;

						default:
							icon = 'save';
					}

					scope.icon = icon;

					if (scope.icon === 'done') {

						setTimeout(function() {
							switchIconSave('default');
						});

					}

					if (scope.icon === 'error') {

						el.children()[0].style.backgroundColor = 'red';
					}
				}

				scope.$watch(attrs.statusCurrent, function(status) {

					switchIconSave(status);
				});
			}
		};
	}
]);
