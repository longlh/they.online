;(function() {
	'use strict';

	angular.module('easy-chat').factory('/services/storage', [
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
				delete storage[key];
			};

			self.clearAll = function() {

			};

			return self;
		}
	]);
})();
