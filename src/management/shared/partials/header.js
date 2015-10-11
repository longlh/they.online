'use strict';

require('..').controller('shared.controllers.header', [
	'ENV',
	function(ENV) {
		this.signOutUrl = ENV.signOutUrl;
	}
]);
