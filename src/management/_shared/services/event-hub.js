'use strict';

require('..').factory('shared.services.event-hub', [
	'shared.services.event-emitter',
	function(EventEmitter) {
		var eventEmitter = new EventEmitter();

		return eventEmitter;
	}
]);
