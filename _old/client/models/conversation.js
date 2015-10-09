;(function() {
	'use strict';

	angular.module(APP).factory('/models/conversation', [
		function() {
			var Conversation = function(visitor, agent) {
				this.visitor = visitor;
				this.agent = agent;

				this.messages = [];
				this.unread = 0;
				this.update = 0;
			};

			Conversation.prototype.appendMessage = function(data) {
				data.self = data.from === this.agent;

				// save message
				this.messages.push(data);

				// increase unread messages counter
				this.unread++;

				// make this conversation latest
				this.update = Date.now();
			};

			Conversation.prototype.read = function() {
				this.unread = 0;
			};

			return Conversation;
		}
	]);
})();
