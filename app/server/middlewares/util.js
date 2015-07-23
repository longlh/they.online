'use strict';

exports._ = '/server/middlewares/util';
exports._factory = function() {
	var self = {};

	self.render = function(template) {
		return function(req, res, next) {
			res.render(template);
		};
	};

	self.status = function(code) {
		return function(req, res, next) {
			res.status(code).end();
		};
	};

	self.json = function(key) {
		return function(req, res, next) {
			res.json(res.locals[key]);
		};
	};

	return self;
};
