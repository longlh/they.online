'use strict';

exports._ = '/server/routes/agent';
exports._requires = [
	'/server/app',
	'/server/middlewares/agents/save'
];
exports._factory = function(app, saveAgent) {
	app.route('/agents/create').get(function(req, res, next) {
		res.render('agents/detail');
	});

	app.route('/agents')
			.post(saveAgent);
};
