'use strict';

exports._ = '/server/core/db';
exports._requires = [
	'@mongoose',
	'/config/env'
];
exports._factory = function(mongoose, config) {
	mongoose.connect(config.db);

	return mongoose;
};
