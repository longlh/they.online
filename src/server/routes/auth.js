'use strict';

exports.name = '/routes/auth';
exports.requires = [
	'/app',
	'/config/auth',
	'/middlewares/auth/session',
	'/middlewares/util'
];
exports.factory = function(app, auth, session, util) {
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
