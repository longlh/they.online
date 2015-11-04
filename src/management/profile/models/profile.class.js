'use strict';

require('..').factory('profile.models.profile', [
	'shared.services.model-factory',
	function(modleFactory) {
		var Profile = modleFactory.model({
			resource: {
				path: '/api/agents/:id/profile',
				defaultParameters: {
					id: '@_id'
				}
			},
			instantiation: {
				defaultProperties: {
					_ignores: ['_id', '__v']
				}
			}
		});

		return Profile.class;
	}
]);
