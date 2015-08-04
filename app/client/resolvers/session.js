;(function() {
	'use strict';

	angular.module(APP).constant('/resolvers/session', [
		'$q',
		'/services/storage',
		function($q, storage) {
			var session = storage.get('session');

			if (!session) {
				return $q.reject();
			}

			return session.ping();
		}
	]);
})();
