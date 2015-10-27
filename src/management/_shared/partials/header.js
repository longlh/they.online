'use strict';

require('..').controller('shared.controllers.header', [
	'ENV',
	'shared.services.storage',
	function(ENV, storage) {
		this.signOutUrl = ENV.signOutUrl;

		this.session = storage.get('session');
		console.log(this.session);
	}
]);
