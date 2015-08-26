'use strict';

exports._ = '/routes/core';
exports._requires = [
	'/app',
	'/middlewares/auth/filter',
	'/middlewares/util'
];
exports._factory = function(app, filter, util) {
	// integrating site
	app.get('/', filter.requireAuthentication, util.render('main'));

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

	// simulator
	app.get('/simu/:id?', function(req, res, next) {
		res.render('simu', {
			id: req.params.id
		});
	});

	app.get('/test', util.render('test'));
};
