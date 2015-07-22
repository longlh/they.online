;(function() {
	'use strict';
	// var COOKIE_KEY_TOKEN = 'token';

	var SessionFactory = function(ModelFactory) {

		var Session = ModelFactory.model({
			resource: {
				path: '/api/sessions/current',
				methods: {
					ping: {
						method: 'get'
					},
					get: false,
					delete: false,
					query: false,
					save: false
				}
			}
		});

		return Session.class;
	};

	angular.module('easy-chat').factory('/models/session', [
		'/services/model-factory',
		SessionFactory
	]);
})();
