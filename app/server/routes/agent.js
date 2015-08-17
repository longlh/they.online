'use strict';

exports._ = '/routes/agent';
exports._requires = [
	'/app',
	'/middlewares/agents/save'
];
exports._factory = function(app, saveAgent) {
	app.route('/agents/create').get(function(req, res, next) {
		res.render('agents/detail');
	});

	app.route('/agents')
			.post(saveAgent);
};
