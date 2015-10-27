'use strict';

exports.name = '/routes/registration';
exports.requires = [
	'/app',
	'/middlewares/registration',
	'/middlewares/util'
];
exports.factory = function(app, registration, util) {
	app._route('auth.registration', '/registration')
			.post(registration.accept,
					util.redirect('auth.sign-on'));

	app._route('auth.registration.activate', '/registration/activate/:id')
			.get(registration.identify({
				code: 'id'
			}), util.render('auth/activate'))
			.post(registration.identify('id'),
					registration.activateTenant,
					registration.activateAgent,
					registration.finish,
					util.redirect('backend.main'));
};
