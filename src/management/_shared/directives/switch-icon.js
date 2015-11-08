'use strict';

require('..').directive('switchIcon', [
	'shared.services.template', '$document',
	function(template, $document) {
		return {
			restrict: 'E',
			templateUrl: template('_shared/directives/switch-icon'),
			link: function(scope, el, attrs) {
				var startX = 0;
				var startY = 0;
				var x = 0;
				var y = 0;

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

				el.css({
					position: 'relative',
					top: '0px',
					left: '0px'
				});

				el.on('mousedown', function(event) {

					startX = event.pageX - x;
					startY = event.pageY - y;

					$document.on('mousemove', mousemove);
					$document.on('mouseup', mouseup);
				});

				function mousemove(event) {

					x = event.pageX - startX;
					y = event.pageY - startY;

					el.css({
						top: y + 'px',
						left: x + 'px'
					});
				}

				function mouseup() {
					$document.off('mousemove', mousemove);
					$document.off('mouseup', mouseup);
				}
			}
		};
	}
]);
