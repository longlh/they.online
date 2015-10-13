'use strict';

require('..').constant('auth.resolvers.session', [
	'$q',
	'shared.services.storage',
	function($q, storage) {
		var session = storage.get('session');

		if (session) {
			return session.ping();
		}

		return $q.reject();
	}
]);
