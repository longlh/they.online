'use strict';

exports.name = '/middlewares/agent';
exports.requires = [
	'@bluebird',
	'/models/agent'
];
exports.factory = function(Promise, Agent) {
	var self = {};

	self.identify = function(indentifier) {
		return function(req, res, next) {
			var id = req.params[indentifier];

			var query = Agent.findById(id);

			return Promise.resolve(query.exec()).then(function(agent) {

				res.locals._agent = agent;
				console.log('Agent');
				console.log(agent);

				next();
			}).catch(next);
		};
	};

	return self;
};
