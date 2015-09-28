'use strict';

exports._ = '/middlewares/auth/filter';
exports._requires = [
	'@lodash'
];
exports._factory = function(_) {
	var self = {};

	self.requireAuthentication = function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}

		res.redirect('/sign-on');
	};

	self.blockUnauthenticated = function(req, res, next) {
		if (res.locals._session) {
			return next();
		}

		res.status(401).end();
	};

	return self;
};