'use strict';

exports._ = '/server/middlewares/agents/save';
exports._requires = [
	'/server/models/agent'
];
exports._factory = function(Agent) {
	return function(req, res, next) {
		console.log(req.body);

		var agent = new Agent(req.body);

		agent.save(function(err, agent, affectedRows) {
			console.log(arguments);

			res.redirect('/agents/create');
		});
	};
};
