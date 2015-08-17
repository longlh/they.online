'use strict';

exports._ = '/config/assets';
exports._requires = [
	'@bluebird',
	'@glob',
	'/app'
];
exports._factory = function(Promise, glob, app) {
	function convert(files, version) {
		return files.map(function(file) {
			return file.replace(/^app\/client/, '/app') + '?' + version;
		});
	}

	return new Promise(function(resolve, reject) {
		// TODO support array of patterns
		glob('app/client/*/**/*.js', function(err, files) {
			if (err) {
				return reject(err);
			}

			files.unshift('app/client/import.js');
			files.unshift('app/client/main.js');
			resolve(files);
		});
	}).then(function(files) {
		return convert(files, Date.now());
	}).then(function(assets) {
		// inject middleware
		app.use(function(req, res, next) {
			res.locals.assets = assets;

			next();
		});
	});
};
