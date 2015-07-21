'use strict';

exports._ = '/server/core/auth';
exports._requires = [
	'@passport',
	'/server/core/auth-strategies/local'
];
exports._factory = function(passport, localStrategy) {
	// config
	passport.use(localStrategy);

	return passport;
};
