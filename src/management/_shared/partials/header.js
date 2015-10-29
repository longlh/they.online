'use strict';

require('..').controller('shared.controllers.header', [
	'$scope',
	'ENV',
	'shared.services.storage',
	function($scope, ENV, storage) {
		this.signOutUrl = ENV.signOutUrl;

		this.session = storage.get('session');
	}
]);
