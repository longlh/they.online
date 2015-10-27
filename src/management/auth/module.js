'use strict';

var angular = require('angular');

module.exports = angular.module('app.auth', [
	require('angular-resource')
]).config([
	'$httpProvider',
	function($httpProvider) {
		$httpProvider.interceptors.push('auth.interceptors.authentication');
	}
]).run([
	'SESSION',
	'auth.models.session',
	'shared.services.storage',
	function(SESSION, Session, storage) {
		// deserialize session from server-pass data
		storage.put('session', new Session(SESSION));
	}
]);
