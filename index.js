'use strict';

var linker = require('di-linker');

linker([
	'./app/main.js',
	'./app/server/**/*.js',
	'./app/config/**/*.js'
], require).bootstrap('/main', function(err, main) {
	if (err) {
		return console.error(err);
	}

	console.log('Modules linked... Application started!');
}).on('error', function(err) {
	console.error(err);
});
