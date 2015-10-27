'use strict';

require('di-linker').walk([
	// 'src/main.js',
	'./src/server/**/*.js'
], require).then(function(context) {
	return context.bootstrap(['/main']);
}).then(function() {
	console.log('Modules linked... Application started!');
}).catch(function(err) {
	console.error(err);
});
