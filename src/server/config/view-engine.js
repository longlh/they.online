'use strict';

exports.name = '/config/view-engine';
exports.requires = [
	'@ect',
	'@path',
	'/app',
	'/config/env'
];
exports.factory = function(ect, path, app, env) {
	var templateDir = path.resolve(env._root, 'server/views');

	var engine = ect({
		watch: true,
		ext: '.ect',
		root: templateDir
	});

	app.set('views', templateDir);

	app.set('view engine', 'ect');

	app.engine('ect', engine.render);
};
