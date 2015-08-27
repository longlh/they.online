'use strict';

exports._ = '/config/auth/strategies/local';
exports._requires = [
	'@bluebird',
	'@passport-local',
	'/models/agent',
	'/models/tenant',
];
exports._factory = function(Promise, local, Agent, Tenant) {
	return new local.Strategy({
		usernameField: 'uid',
		passwordField: 'pwd',
		passReqToCallback: true
	}, function(req, uid, pwd, done) {
		var domain = req.body.domain;

		var query = Tenant.where({
			'domains.value': domain
		}).findOne();

		return Promise.resolve(query.exec()).then(function(tenant) {
			if (!tenant) {
				return Promise.reject(new Error('Tenant not found'));
			}

			return Agent.where({
				'tenant': tenant._id,
				'accounts.kind': 'internal',
				'accounts.uid': uid
			}).findOne().exec();
		}).then(function(agent) {
			if (!agent) {
				return Promise.reject(new Error('Agent not found'));
			}

			if (!agent.authenticate(pwd)) {
				return Promise.reject(new Error('Incorrect password'));
			}

			return agent;
		}).then(function(agent) {
			done(null, agent);
		}).catch(done);
	});
};
