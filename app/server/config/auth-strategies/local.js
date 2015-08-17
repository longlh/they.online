'use strict';

exports._ = '/config/auth/strategies/local';
exports._requires = [
	'@bluebird',
	'@passport-local',
	'/models/agent'
];
exports._factory = function(Promise, local, Agent) {
	return new local.Strategy({
		usernameField: 'uid',
		passwordField: 'pwd'
	}, function(uid, pwd, done) {
		var query = Agent.where({
			'accounts.kind': 'internal',
			'accounts.uid': uid
		}).findOne();

		var find = Promise.promisify(query.exec, query);

		return find().then(function(agent) {
			var err;

			if (!agent) {
				err = new Error('No agent found');
			} else if (!agent.authenticate(pwd)) {
				err = new Error('Incorrect password');
			}

			done(err, agent);
		}).catch(done);
	});
};
