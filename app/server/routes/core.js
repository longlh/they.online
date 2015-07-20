'use strict';

exports._ = '/server/routes/core';
exports._requires = [
	'/server/app'
];
exports._factory = function(app) {
	// integrating site
	app.get('/', function(req, res, next) {
		res.render('main');
	});

	// agent page
	app.get('/agent/:id', function(req, res, next) {
		res.render('agent', {
			id: req.params.id
		});
	});

	// iframe
	app.get('/iframe/:id', function(req, res, next) {
		res.render('iframe', {
			id: req.params.id
		});
	});
};
