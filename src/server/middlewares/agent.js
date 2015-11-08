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
				// console.log(agent);
				res.locals._agent = agent;

				next();
			}).catch(next);
		};
	};

	self.updateProfile = function(req, res, next) {

		var query = Agent.findByIdAndUpdate(res.locals._agent._id, {

			profile: {
				name: req.body.name,
				email: req.body.email,
				phone: req.body.phone,
				information: req.body.information
			}
		}, {
			new: true
		});

		return Promise.resolve(query.exec()).then(function(agent) {
			res.locals._agent = agent;

			next();
		}).catch(next);
	};

	return self;
};
