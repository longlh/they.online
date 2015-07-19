'use strict';

exports._ = '/server/app';
exports._requires = [
	'@express',
	'@body-parser'
];
exports._activations = [
	'/server/core/view-engine',
	'/server/routes/core',
	'/server/routes/agent'
];
exports._factory = function(express, bodyParser) {
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	return app;
};
