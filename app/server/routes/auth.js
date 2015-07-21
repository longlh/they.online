'use strict';

exports._ = '/server/routes/auth';
exports._requires = [
	'/server/app',
	'/server/core/auth',
	'/server/middlewares/auth/session'
];
exports._factory = function(app, auth, session) {
	app.use(session.deserialize);

	app.route('/signin')
			.get(function(req, res, next) {
				res.render('auth/signin');
			})
			.post(auth.authenticate('local', {
				session: false
			}), session.serialize, function(req, res, next) {
				res.redirect('/');
			});
};
