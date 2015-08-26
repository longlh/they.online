'use strict';

exports._ = '/routes/auth';
exports._requires = [
	'/app',
	'/config/auth',
	'/middlewares/auth/session',
	'/middlewares/util'
];
exports._factory = function(app, auth, session, util) {
	app.use(session.deserialize);

	app.route('/sign-on')
			.get(util.render('auth/sign-on'))
			.post(auth.authenticate('local', {
				session: false
			}), session.serialize, util.redirect('/'));

	app.route('/sign-up')
			.get(util.render('auth/sign-up'))
			.post(function(req, res, next) {
				console.log(req.body);

				res.redirect('/sign-up');
			});

	app.get('/sign-out', session.destroy, util.redirect('/'));
};
