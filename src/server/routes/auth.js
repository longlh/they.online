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

	app._route('auth.sign-on', '/sign-on')
			.get(util.render('auth/sign-on'))
			.post(auth.authenticate('local', {
				session: false
			}), session.serialize, util.redirect('backend.main'));

	app._route('auth.sign-up', '/sign-up')
			.get(util.render('auth/sign-up'));

	app._get('auth.sign-out', '/sign-out', session.destroy, util.redirect('auth.sign-on'));
};
