'use strict';

exports._ = '/chat/container';
exports._requires = [
	'@lodash',
];
exports._factory = function(_) {
	var self = {
		waiting: {},
		onlineAgents: {}
	};

	self.getOnlineAgent = function(tenant) {
		var onlineAgents = this.onlineAgents[tenant];

		if (_.isArray(onlineAgents) && onlineAgents.length) {
			return onlineAgents[0];
		}

		return null;
	};

	self.addOnlineAgent = function(tenant, id) {

	};

	self.removeOnlineAgent = function(tenant, id) {

	};

	self.wait = function(tenant, id) {
		this.waiting[tenant] = this.waiting[tenant] || [];

		this.waiting[tenant].push(id);
	};

	return self;
};
