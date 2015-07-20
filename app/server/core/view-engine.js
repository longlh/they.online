'use strict';

exports._  = '/server/core/view-engine';
exports._requires = [
	'@ect',
	'@path',
	'/server/app',
	'/config/env'
];
exports._factory = function(ect, path, app, env) {
	var templateDir = path.resolve(env.rootDir, 'app/server/views');
	var renderer = ect({
		watch: true,
		ext: '.ect',
		root: templateDir
	});

	app.set('views', templateDir);

	app.set('view engine', 'ect');
	app.engine('ect', renderer.render);
};
