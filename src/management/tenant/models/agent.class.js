'use strict';

require('..').factory('tenant.models.agent', [
	'shared.services.model-factory',
	'tenant.models.profile',
	function(modelFactory, Profile) {
		var Agent = modelFactory.model({
			resource: {
				path: '/api/agents/:id',
				defaultParameters: {
					id: '@_id'
				}
			},
			instantiation: {
				defaultProperties: {
					_ignores: ['_id', '__v']
				},
				construct: function() {
					this.profile = new Profile(this.profile);
					this.profile._agentId = this._id;
				}
			}
		});

		return Agent.class;
	}
]);
