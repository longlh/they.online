'use strict';

exports._ = '/chat/container';
exports._requires = [
	'@lodash',
];
exports._factory = function(_) {
	var self = {
		waiting: {},
		tenants: {},
		sockets: {},
		agents: {},
		visitors: {},
		connections: {}
	};

	self.getOnlineAgent = function(tenant) {
		var onlineAgents = this.tenants[tenant];

		if (_.isArray(onlineAgents) && onlineAgents.length) {
			return onlineAgents[0];
		}

		return null;
	};

	self.connect = function(agent, visitor) {
		this.connections[visitor] = agent;
		this.connections[agent] = this.connections[agent] || [];
		this.connections[agent].push(visitor);

		console.log('Agent [' + agent + '] - Visitor [' + visitor + ']... Connected!');
	};

	self.visitorDisconnect = function(visitor) {
		var agent = this.connections[visitor];

		var visitors = this.connections[agent];

		if (visitors && visitors.length === 1) {
			return self.agentDisconnect(agent);
		}

		_.pull(visitors, visitor);
		delete this.connections[visitor];
	};

	self.agentDisconnect = function(agent) {
		if (!this.connections[agent]) {
			return;
		}

		_.forEach(this.connections[agent], function(visitor) {
			delete this.connections[visitor];
		}, this);

		this.connections[agent].length = 0;
		delete this.connections[agent];
	};

	self.wait = function(tenant, visitor) {
		this.waiting[tenant] = this.waiting[tenant] || [];

		this.waiting[tenant].push(visitor);
	};

	return self;
};
