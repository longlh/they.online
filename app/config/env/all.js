'use strict';

exports._ = '/config/env';
exports._requires = [
	'@lodash',
	process.env.NODE_ENV ?
			exports._ + '/' + process.env.NODE_ENV :
			exports._ + '/development'
];
exports._factory = function(_, executionProfile) {
	var defaults = {

	};

	return _.assign(defaults, executionProfile);
};
