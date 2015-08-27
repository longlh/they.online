'use strict';

exports._ = '/routes/registration';
exports._requires = [
	'/app',
	'/middlewares/registration',
	'/middlewares/util'
];
exports._factory = function(app, registration, util) {
	app.route('/registration')
			.post(registration.accept);

	app.route('/registration/activate/:id')
			.get(registration.identify({
				code: 'id'
			}), util.render('auth/activate'))
			.post(registration.identify('id'),
					registration.activateTenant,
					registration.activateAgent,
					registration.finish,
					util.redirect('/'));
};
