'use strict';

exports._ = '/routes/core';
exports._requires = [
	'/app',
	'/middlewares/auth/filter',
	'/middlewares/util'
];
exports._factory = function(app, filter, util) {
	app._get('landing', '/', util.render('landing'));

	app._get('backend.main', '/manager', filter.requireAuthentication, util.render('main'));

	app.get('/test', util.render('test'));
};
