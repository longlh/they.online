'use strict';

exports._ = '/server/routes/api';

exports._requires = [
	'/server/app',
	'/server/middlewares/auth/filter'
];

exports._factory = function(app, authFilter) {
	app.use('/api', authFilter.blockUnauthenticated);

	app.get('/api/sessions/current', function(req, res, next) {
		res.status(204).end();
	});
};
