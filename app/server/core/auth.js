'use strict';

exports._ = '/server/core/auth';
exports._requires = [
	'@passport',
	'/server/core/auth-strategies/local',
	'/server/models/agent'
];
exports._factory = function(passport, localStrategy, Agent) {
	// config
	passport.serializeUser(function serialize(agent, done) {
		done(null, agent._id);
	});

	passport.deserializeUser(Agent.findById.bind(Agent));

	passport.use(localStrategy);

	return passport;
};
