;(function() {
	'use strict';

	angular.module(APP).factory('/models/agent', [
		'/services/model-factory',
		function(ModelFactory) {
			var Agent = ModelFactory.model({
				resource: {
					path: '/api/agents/:id',
					defaultParameters: {
						id: '@_id'
					}
				},
				instantiation: {
					defaultProperties: {
						_ignore: ['_id', '__v']
					}
				}
			});

			return Agent.class;
		}
	]);

})();
