'use strict';

var angular = require('angular');

module.exports = angular.module('they.online', [
	require('./modules/auth').name,
	require('./modules/dashboard').name
]);

angular.element(window).ready(function() {
	angular.bootstrap(document.body, ['they.online']);
});
