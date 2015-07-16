'use strict';

exports._ = '/server';
exports._requires = [
	'@express'
];
exports._factory = function(express) {
	var app = express();

	return app;
};
