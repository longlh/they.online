;(function(di) {
	'use strict';

	di.register('@bluebird', window.Promise)
			.register('@ractive', window.Ractive)
			.register('@lodash', window._);
})(window.__('they.online'));
