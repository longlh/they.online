'use strict';

require('..').factory('shared.services.mdl-integration', [
	'$rootScope',
	'global:componentHandler',
	'shared.services.event-hub',
	function($rootScope, componentHandler, eventHub) {
		var self = {};
		self.latency = 50;
		self.upgrade = function() {
			componentHandler.upgradeDom();
		};

		function activate() {
			var deferred;

			function upgradeDom() {
				clearTimeout(deferred);

				deferred = setTimeout(function() {
					self.upgrade();
				}, self.latency);
			}

			// integrate with Material-Design-Lite
			var observer = new MutationObserver(upgradeDom);

			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		}

		activate();

		return self;
	}
]);
