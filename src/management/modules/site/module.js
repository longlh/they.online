'use strict';

var angular = require('angular');

module.exports = angular.module('app.site', [
	require('angular-ui-router'),
	require('../../shared').name
]).config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('dashboard', {
			url: '/',
			templateUrl: '/src/management/modules/site/partials/dashboard.tpl.html',
			controller: 'site.controllers.dashboard'
		});
	}
]);
