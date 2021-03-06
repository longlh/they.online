'use strict';

exports.name = '/chat/container';
exports.requires = [
	'@lodash',
];
exports.factory = function(_) {
	var self = {
		waiting: {},
		tenants: {},
		sockets: {},
		agents: {},
		visitors: {},
		connections: {}
	};

	self.socketConnect = function(socket, data) {
		this.sockets[socket] = data;
	};

	self.agentOnline = function(socket, agent, tenant) {
		this.agents[agent] = this.agents[agent] || [];

		var isFirst = this.agents[agent].length === 0;

		// prevent dupplicate data
		_.pull(this.agents[agent], socket);

		this.agents[agent].push(socket);

		if (isFirst) {
			this.tenants[tenant] = this.tenants[tenant] || [];

			// prevent dupplicate data
			_.pull(this.tenants[tenant], agent);

			this.tenants[tenant].push(agent);
		}

		return isFirst;
	};

	self.visitorOnline = function(socket, visitor, tenant) {
		var sockets = this.visitors[visitor] = this.visitors[visitor] || [];

		// prevent dupplicate data
		_.pull(sockets, socket);

		var isFirst = sockets.length === 0;

		sockets.push(socket);

		return isFirst;
	};

	self.getOnlineAgent = function(tenant) {
		var onlineAgents = this.tenants[tenant];

		if (_.isArray(onlineAgents) && onlineAgents.length) {
			return onlineAgents[0];
		}

		return undefined;
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
		this.connections[visitor] = undefined;
	};

	self.agentDisconnect = function(agent) {
		if (!this.connections[agent]) {
			return;
		}

		_.forEach(this.connections[agent], function(visitor) {
			//delete
			this.connections[visitor] = undefined;
		}, this);

		// empty array
		this.connections[agent].length = 0;
	};

	self.wait = function(tenant, visitor) {
		console.log('Visitor [' + visitor + '] is waiting for an Agent of Tenant [' + tenant + ']');

		this.waiting[tenant] = this.waiting[tenant] || [];

		this.waiting[tenant].push(visitor);
	};

	self.clearWait = function(tenant) {
		if (this.waiting[tenant]) {
			// empty array
			this.waiting[tenant].length = 0;
		}

		console.log('Clear waiting queue of tenant [' + tenant + ']');
	};

	return self;
};
