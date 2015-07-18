'use strict';

exports._ = '/server/routes/core';
exports._requires = [
	'/server/app'
];
exports._factory = function(app) {
	app.get('/', function(req, res, next) {
		// res.send('<h1>Hello world!</h1>').end();
		res.render('index');
	});
};
