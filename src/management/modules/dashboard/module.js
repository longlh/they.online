'use strict';

var angular = require('angular');

module.exports = angular.module('app.dashboard', [
	require('angular-route'),
	require('../../shared').name
]);
