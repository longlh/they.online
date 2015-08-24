;(function() {
	'use strict';

	angular.module(APP).factory('/models/conversation', [
		function() {
			var Conversation = function(visitor) {
				this.visitor = visitor;
				this.messages = [];
				this.unread = 0;
				this.update = 0;
			};

			Conversation.prototype.appendMessage = function(data) {
				this.messages.push(data);
				this.unread++;
				this.update = Date.now();
			};

			Conversation.prototype.read = function() {
				this.unread = 0;
			};

			return Conversation;
		}
	]);
})();
