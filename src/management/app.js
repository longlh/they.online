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
	function($rootScope) {
		var deferred;

		function upgradeDom() {
			clearTimeout(deferred);

			deferred = setTimeout(function() {
				componentHandler.upgradeAllRegistered();
			}, 100);
		}

		// integrate with Material-Design-Lite
		$rootScope.$on('$viewContentLoaded', upgradeDom);
		$rootScope.$on('$includeContentLoaded', upgradeDom);
	}
]);

angular.element(window).ready(function() {
	angular.bootstrap(document.body, ['they.online']);
});
