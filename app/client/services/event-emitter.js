;(function() {
	'use strict';

	angular.module('easy-chat').factory('/services/event-emitter', [
		'$rootScope',
		function($rootScope) {
			var self = {};

			self.emit = function(event, message) {
				$rootScope.$emit(event, message);
			};

			self.on = function(event, handler) {
				$rootScope.$on(event, function(event, data) {
					handler(data);
				});
			};

			return self;
		}
	]);
})();
