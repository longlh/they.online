'use strict';

var angular = require('angular');

module.exports = angular.module('app.site', [
	require('angular-ui-router'),
	require('../_shared').name
]).config([
	'$stateProvider',
	function($stateProvider) {
		$stateProvider.state('dashboard', {
			url: '/',
			templateUrl: '/src/management/site/partials/dashboard.tpl.html',
			controller: 'site.controllers.dashboard'
		});
	}
]);
