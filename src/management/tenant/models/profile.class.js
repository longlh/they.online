'use strict';

require('..').factory('tenant.models.profile', [
	'shared.services.model-factory',
	function(modelFactory) {
		var Profile = modelFactory.model({
			resource: {
				path: '/api/agents/:id/profile',
				defaultParameters: {
					id: '@_agentId'
				},
				methods: {
					get: false,
					query: false,
					delete: false
				}
			},
			instantiation: {
				defaultProperties: {
					_ignores: ['_id', '__v', '_agentId']
				}
			}
		});

		Object.defineProperty(Profile.class.prototype, 'save', {
			value: function() {
				var agentId = this._agentId;

				return Profile.base.save.apply(this).then(function(profile) {
					profile._agentId = agentId;

					return profile;
				});
			}
		});

		return Profile.class;
	}
]);
