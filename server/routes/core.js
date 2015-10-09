'use strict';

exports.name = '/routes/core';
exports.requires = [
	'/app',
	'/middlewares/auth/filter',
	'/middlewares/util'
];
exports.factory = function(app, filter, util) {
	app._get('landing', '/', util.render('landing'));

	app._get('backend.main', '/app', filter.requireAuthentication, util.render('main'));

	app.get('/test', util.render('test'));
};
