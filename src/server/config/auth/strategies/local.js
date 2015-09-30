'use strict';

exports.name = '/config/auth/strategies/local';
exports.requires = [
	'@bluebird',
	'@passport-local',
	'/models/agent'
];
exports.factory = function(Promise, local, Agent) {
	return new local.Strategy({
		usernameField: 'email',
		passwordField: 'password'
	}, function(email, password, done) {
		var query = Agent.where({
			'accounts.kind': 'internal',
			'accounts.uid': email
		}).findOne();

		return Promise.resolve(query.exec()).then(function(agent) {
			if (!agent) {
				return Promise.reject(new Error('Agent not found'));
			}

			if (!agent.authenticate(password)) {
				return Promise.reject(new Error('Incorrect password'));
			}

			return agent;
		}).then(function(agent) {
			done(null, agent);
		}).catch(done);
	});
};
