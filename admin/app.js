'use strict';

var angular = require('angular');

module.exports = angular.module('they.online', [
	require('app.auth').name,
	require('app.dashboard').name
]);

angular.element(window).ready(function() {
	angular.bootstrap(document.body, ['they.online']);
});
