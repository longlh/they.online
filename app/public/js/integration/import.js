;(function(di) {
	'use strict';

	di.register('@bluebird', [
		function() {
			return window.Promise;
		}
	]).register('@ractive', [
		function() {
			return window.Ractive;
		}
	]);
})(window.__('they.online'));
