'use strict';

exports._ = '/server/routes/auth';
exports._requires = [
	'/server/app',
	'/server/core/auth'
];
exports._factory = function(app, auth) {
	app.route('/signin')
			.get(function(req, res, next) {
				res.render('auth/signin');
			})
			.post(auth.authenticate('local'), function(req, res, next) {
				console.log(req.user);

				res.redirect('/');
			});
};
