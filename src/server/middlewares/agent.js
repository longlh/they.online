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

				res.locals._profile = agent;

				next();
			}).catch(next);
		};
	};

	self.updateProfile = function(req, res, next) {

		var query = Agent.findByIdAndUpdate(res.locals._profile._id, {
			name: req.body.name,
			profile: {
				company: req.body.profile.company,
				location: req.body.profile.location,
				country: req.body.profile.country
			}
		}, {
			new: true
		});

		return Promise.resolve(query.exec()).then(function(profile) {
			res.locals._profile = profile;

			next();
		}).catch(next);
	};

	return self;
};
