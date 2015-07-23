'use strict';

var profile = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

exports._ = '/config/env';
exports._requires = [
	'@lodash',
	'@path',
	exports._ + '/' + profile
];
exports._factory = function(_, path, executionProfile) {
	var defaults = {
		rootDir: path.resolve(__dirname, '../../..'),
		profile: profile,
		session: {
			cookie: '_sid',
			// expiry: 1 * 10 * 1000 // 1 hour
			expiry: 60 * 60 * 1000 // 1 hour
		}
	};

	return _.assign(defaults, executionProfile);
};
