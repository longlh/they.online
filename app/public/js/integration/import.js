;(function(di) {
	'use strict';

	di.register('@lodash', window._)
			.register('@socket.io', window.io)
			.register('@bluebird', window.Promise)
			.register('@ractive', window.Ractive)
			.register('@local-storage', window.localStorage);
})(window.__('they.online'));
