'use strict';

exports._ = '/routes/core';
exports._requires = [
	'/app',
	'/middlewares/auth/filter',
	'/middlewares/util'
];
exports._factory = function(app, filter, util) {
	// integrating site
	app._get('backend.main', '/manager', filter.requireAuthentication, util.render('main'));

	app.get('/test', util.render('test'));
};
