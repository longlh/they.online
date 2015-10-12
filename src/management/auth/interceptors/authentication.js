'use strict';

require('..').factory('auth.interceptors.authentication', [
	'shared.services.storage',
	function(storage) {
		return {
			request: function(config) {
				var session = storage.get('session');

				if (session) {
					config.headers.Authentication = session.id;
				}

				return config;
			}
		};
	}
]);
