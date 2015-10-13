'use strict';

var angular = require('angular');

module.exports = angular.module('app.site', [
	require('angular-ui-router'),
	require('../_shared').name
]);
