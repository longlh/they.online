'use strict';

var angular = require('angular');
var componentHandler = require('component-handler');

module.exports = angular.module('they.online', [
	require('angular-ui-router'),
	require('./_shared').name,
	require('./auth').name,
	require('./site').name,
	require('./socket').name,
	require('./tenant').name
]).constant('global:componentHandler', componentHandler).config([
	'$urlRouterProvider',
	function($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	}
]).run([
	'$state',
	function($state) {
		// force initialize state on pageload
	}
]);

angular.element(window).ready(function() {
	angular.bootstrap(document.body, ['they.online']);
});
