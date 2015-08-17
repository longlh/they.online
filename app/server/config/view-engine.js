'use strict';

exports._  = '/config/view-engine';
exports._requires = [
	'@ect',
	'@path',
	'/app',
	'/config/env'
];
exports._factory = function(ect, path, app, env) {
	var templateDir = path.resolve(env._root, 'app/server/views');

	var engine = ect({
		watch: true,
		ext: '.ect',
		root: templateDir
	});

	app.set('views', templateDir);

	app.set('view engine', 'ect');

	app.engine('ect', engine.render);
};
