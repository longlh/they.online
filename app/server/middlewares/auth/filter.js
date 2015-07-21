'use strict';

exports._ = '/server/middlewares/auth/filter';
exports._requires = [
	'@lodash'
];
exports._factory = function(_) {
	var self = {};

	self.requireAuthenticate = function(req, res, next) {
		if (req.isAuthenticated()) {
			// strip down all sentitive information
			res.locals.agent = _.pick(req.user, 'id', 'tenant', 'displayName', 'admin');

			return next();
		}

		res.redirect('/signin');
	};

	return self;
};
