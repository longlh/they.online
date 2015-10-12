'use strict';

require('..').factory('shared.interceptors.not-found', [
	function() {
		return {
			response: function(response) {
				// TODO check 404 here
				return response;
			}
		};
	}
]);
