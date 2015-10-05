'use strict';

they.online.factory('main', [
	'@ractive',
	'/services/http',
	function(Ractive, http) {
		console.log(Ractive);

		console.log(http);
	}
]);
