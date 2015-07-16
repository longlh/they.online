'use strict';

var linker = require('di-linker');

linker([
	'./app/main.js',
	'./app/server/**/*.js',
	'./app/config/**/*.js'
], require).bootstrap('/main', function() {
	console.log('Application wired...');
});
