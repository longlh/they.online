'use strict';

require('..').controller('shared.controllers.header', [
	'ENV',
	'shared.services.storage',
	function(ENV, storage) {
		this.signOutUrl = ENV.signOutUrl;

		this.session = storage.get('session');

		this.signOut = function() {
			alert('should sign out');
		};
	}
]);
