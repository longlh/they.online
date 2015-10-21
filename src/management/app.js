'use strict';

var angular = require('angular');
var componentHandler = require('component-handler');

console.log(componentHandler);

module.exports = angular.module('they.online', [
	require('angular-ui-router'),
	require('./_shared').name,
	require('./auth').name,
	require('./site').name,
	require('./socket').name,
	require('./tenant').name
]).config([
	'$urlRouterProvider',
	function($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	}
]).run([
	'$state',
	function($state) {
		// force initialize state on pageload
	}
]).run([
	'$rootScope',
	'$timeout',
	function($rootScope, $timeout) {
		$rootScope.$on('$viewContentLoaded', function() {
			$timeout(function() {
				componentHandler.upgradeAllRegistered();
			});
		});
	}
]);

angular.element(window).ready(function() {
	angular.bootstrap(document.body, ['they.online']);
});
