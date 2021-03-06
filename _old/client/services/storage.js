;(function() {
	'use strict';

	angular.module(APP).factory('/services/storage', [
		function() {
			var storage = {};
			var self = {};

			self.get = function(key) {
				return storage[key];
			};

			self.put = function(key, value) {
				storage[key] = value;
			};

			self.clear = function(key) {
				storage[key] = undefined;
			};

			self.clearAll = function() {

			};

			return self;
		}
	]);
})();
