'use strict';

require('..').factory('shared.interceptors.not-found', [
	'$q',
	function($q) {
		return {
			responseError: function(response) {
				// TODO check 404 here
				console.log('should redirect to error page', response);
				alert('error');

				return $q.reject(response);
			}
		};
	}
]);
