'use strict';

exports._ = '/config/auth';
exports._requires = [
	'@passport',
	'/config/auth/strategies/local'
];
exports._factory = function(passport, localStrategy) {
	// config
	passport.use(localStrategy);

	return passport;
};
