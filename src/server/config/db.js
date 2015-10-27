'use strict';

exports.name = '/config/db';
exports.requires = [
	'@mongoose',
	'/config/env'
];
exports.factory = function(mongoose, config) {
	mongoose.connect(config.db);

	return mongoose;
};
