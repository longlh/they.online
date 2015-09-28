;(function(di) {
	'use strict';

	di.register('@socket.io', window.io)
			.register('@ractive', window.Ractive)
			.register('@local-storage', window.localStorage);
})(window.__('they.online'));
