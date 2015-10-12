'use strict';

var angular = require('angular');

module.exports = angular.module('app.site', [
	require('angular-ui-router'),
	require('../_shared').name
]).config([
	'$stateProvider',
	'shared.services.template',
	function($stateProvider, template) {
		$stateProvider.state('dashboard', {
			url: '/',
			templateUrl: template('site/partials/dashboard'),
			controller: 'site.controllers.dashboard'
		});
	}
]);
