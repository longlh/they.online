'use strict';

var path = require('path');

require('..').constant('shared.services.template', function(url) {
	return path.resolve('/src/management', url) + '.tpl.html';
});
