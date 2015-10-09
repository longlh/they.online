'use strict';

exports.name = '/middlewares/util';
exports.requires = [
	'@lodash'
];
exports.factory = function(_) {
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
		function look(data, keys) {
			if (_.isUndefined(data) || _.isNull(data)) {
				return undefined;
			}

			var key = keys.shift();

			if (key) {
				// keep looking deeper
				return look(data[key], keys);

			}

			return data;
		}

		return function(req, res, next) {
			res.json(look(res.locals, key.split('.')));
		};
	};

	self.redirect = function(dest, routeParams, absoluteUrl) {
		return function(req, res, next) {
			if (!absoluteUrl) {
				return res._redirect(dest, routeParams);
			}

			return res.redirect(dest);
		};
	};

	return self;
};
