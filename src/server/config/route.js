'use strict';

exports._ = '/config/route';
exports._requires = [
	'@reverse-route',
	'/config/express'
];
exports._factory = function(reverseRoute, app) {
	reverseRoute(app);
};
