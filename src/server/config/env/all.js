'use strict';

var profile = process.env.NODE_ENV || 'development';

exports._ = '/config/env';
exports._requires = [
	'@lodash',
	'@path',
	exports._ + '/' + profile
];
exports._factory = function(_, path, specifiedConfiguration) {
	var defaults = {
		_root: path.resolve(__dirname, '../../..'),
		_profile: profile,
		applicationName: 'they.online',
		session: {
			cookie: '_sid',
			// expiry: 1 * 10 * 1000 // 1 hour
			expiry: 60 * 60 * 1000 // 1 hour
		},
		development: true
	};

	console.log(defaults._root);

	return _.assign(defaults, specifiedConfiguration);
};
