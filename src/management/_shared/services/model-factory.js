'use strict';

var _ = require('lodash');

require('..').factory('shared.services.model-factory', [
	'$resource',
	function($resource) {
		var DEFAULT_METHODS = {
			query: {
				method: 'get',
				isArray: true
			},
			get: {
				method: 'get'
			},
			save: {
				method: 'post'
			},
			delete: {
				method: 'delete'
			}
		};

		var self = {};

		self.model = function(options) {
			var Model = function(properties) {
				_.assign(this, properties);

				if (options.instantiation) {
					_.defaults(this, _.clone(options.instantiation.defaultProperties, true));

					if (_.isFunction(options.instantiation.construct)) {
						options.instantiation.construct.apply(this);
					}
				}

				_.defaults(this, {
					_ignores: []
				});
			};

			var transform = function(customHandler) {
				return function(response) {
					if (response.resource) {
						var data;

						if (_.isArray(response.resource)) {
							data = _.map(response.resource, function iterate(resource) {
								if (resource instanceof Model) {
									Model.call(resource);

									return resource;
								}

								return new Model(resource);
							});
						} else {
							data = response.resource;
							if (response.resource instanceof Model) {
								// re-call constructor
								Model.call(data);
							} else {
								data = new Model(response.resource);
							}
						}

						return _.isFunction(customHandler) ?
								customHandler(response, data) :
								data;
					}
				};
			};

			var injectIntercepter = function(method) {
				method.interceptor = method.interceptor || {};

				method.interceptor.response = transform(method.interceptor.response);
			};

			var methods = {};

			options.resource.methods = options.resource.methods || {};

			_.forEach(options.resource.methods, function(method, name) {
				if (method) {
					methods[name] = method;
					injectIntercepter(method);
				}
			});

			_.forEach(DEFAULT_METHODS, function(method, name) {
				if (options.resource.methods[name] !== false) {
					// console.log('use default [' + name + '] method...');
					methods[name] = _.clone(method, true);
					injectIntercepter(methods[name]);
				}
			});

			var Resource = $resource(options.resource.path, options.resource.defaultParameters, methods);

			var proto = new Resource();

			Model.prototype = Object.create(proto, {
				constructor: {
					value: Model
				},
				includeProperty: {
					value: function(property) {
						var index = this._ignores.indexOf(property);

						if (index > -1) {
							_.pullAt(this._ignores, index);
						}

						return this;
					}
				},
				ignoreProperty: {
					value: function(property) {
						if (this._ignores.indexOf(property) > -1) {
							this._ignores.push(property);
						}

						return this;
					}
				},
				toJSON: {
					value: function() {
						var result = proto.toJSON.apply(this);

						_.forEach(this._ignores, function iterate(prop) {
							result[prop] = undefined;
						});

						result._ignores = undefined;

						return result;
					}
				}
			});

			// add sugar method:
			// $delete -> delete
			// $save -> save
			// ...
			_.forEach(methods, function iterate(method, name) {
				if (method) {
					if (_.isFunction(proto['$' + name])) {
						proto[name] = proto['$' + name];
					}
				}
			});

			_.forEach(methods, function iterate(meta, method) {
				if (meta && _.isFunction(Resource[method])) {
					Model[method] = function() {
						return Resource[method].apply(Model, arguments).$promise;
					};
				}
			});

			// clear
			methods = undefined;

			return {
				class: Model,
				base: proto
			};
		};

		return self;
	}
]);
