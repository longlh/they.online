'use strict';

exports._ = '/server/routes/core';
exports._requires = [
	'/server/app',
	'/server/middlewares/auth/filter'
];
exports._factory = function(app, filter) {
	// integrating site
	app.get('/', filter.requireAuthentication, function(req, res, next) {
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
