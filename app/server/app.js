'use strict';

exports._ = '/server/app';
exports._requires = [
	'@express'
];
exports._activations = [
	'/server/core/view',
	'/server/routes/core'
];
exports._factory = function(express) {
	var app = express();

	return app;
};
