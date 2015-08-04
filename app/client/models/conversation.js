;(function() {
	'use strict';

	angular.module(APP).factory('/models/conversation', [
		function() {
			var Conversation = function(visitor) {
				this.visitor = visitor;
			};

			Conversation.prototype = [];

			return Conversation;
		}
	]);
})();
