'use strict';

exports._ = '/routes/auth';
exports._requires = [
	'/app',
	'/config/auth',
	'/middlewares/auth/session'
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

	app.get('/signout', session.destroy, function(req, res, next) {
		res.redirect('/');
	});
};
