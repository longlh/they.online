'use strict';

var angular = require('angular');

module.exports = angular.module('shared', [
]).config([
	'$httpProvider',
	function($httpProvider) {
		$httpProvider.interceptors.push('shared.interceptors.not-found');
	}
]).run([
	'shared.services.mdl-integration',
	function() {}
]).run([
	'$rootScope',
	function($rootScope) {
		$rootScope.$on('$stateChangeError', function() {
			console.log(arguments);
		});
	}
]);
