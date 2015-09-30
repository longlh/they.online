'use strict';

exports.name = '/config/route';
exports.requires = [
	'@reverse-route',
	'/config/express'
];
exports.factory = function(reverseRoute, app) {
	reverseRoute(app);
};
