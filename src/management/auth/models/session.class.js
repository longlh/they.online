'use strict';

require('..').factory('auth.models.session', [
	'shared.services.model-factory',
	function(ModelFactory, Agent) {
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
			},
			instantiation: {
				construct: function() {
					// convert raw data to Agent object
					// this.agent = new Agent(this.agent);
				}
			}
		});

		return Session.class;
	}
]);
