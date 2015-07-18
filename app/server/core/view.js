'use strict';

exports._  = '/server/core/view';
exports._requires = [
	'@ect',
	'@path',
	'/server/app'
];
exports._factory = function(ect, path, app) {
	var renderer = ect({
		watch: true,
		ext: '.ect'
	});

	app.set('views', path.resolve('.', 'app/server/views'));

	app.set('view engine', 'ect');
	app.engine('ect', renderer.render);
};
