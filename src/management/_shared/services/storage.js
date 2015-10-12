'use strict';

require('..').factory('shared.services.storage', function() {
	var storage = {};
	var self = {};

	Object.defineProperty(self, 'get', {
		value: function(key) {
			return storage[key];
		}
	});

	Object.defineProperty(self, 'put', {
		value: function(key, value) {
			storage[key] = value;

			return this;
		}
	});

	Object.defineProperty(self, 'clear', {
		value: function(key) {
			storage[key] = undefined;

			return this;
		}
	});

	return self;
});
