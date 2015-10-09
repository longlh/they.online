'use strict';

require('./module').controller('/controllers/container', [
	'$scope',
	function($scope) {
		console.log('controller initialized');
	}
]);
