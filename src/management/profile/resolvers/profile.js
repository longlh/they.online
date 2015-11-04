'use strict';

require('..').constant('profile.resolvers.profile', [
	'profile.models.profile',
	'shared.services.storage',
	function(Profile, storage) {

		var session = storage.get('session');

		return Profile.get({
			id: session.agent._id
		});
	}
]);
