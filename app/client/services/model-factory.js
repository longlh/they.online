;(function() {
	'use strict';

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

	var ModelFactory = function($resource) {

		return {
			model: function(options) {
				var Model = function(properties) {
					_.assign(this, properties);

					if (options.instantiation) {
						_.defaults(this, _.clone(options.instantiation.defaultProperties, true));

						if (_.isFunction(options.instantiation.construct)) {
							options.instantiation.construct.apply(this);
						}
					}

					_.defaults(this, {
						_ignore: []
					});
				};

				var transform = function(customHandler) {
					return function(response) {
						if (response.resource) {
							var data;

							if (_.isArray(response.resource)) {
								data = _.map(response.resource, function iterate(r) {
									if (r instanceof Model) {
										Model.call(r);

										return r;
									}

									return new Model(r);
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

				// set default options
				_.defaults(options.resource, {
					methods: {}
				});

				_.defaults(options.resource.methods, _.clone(DEFAULT_METHODS, true));

				_.forEach(options.resource.methods, function iterate(method, name) {
					if (!method) {
						delete options.resource.methods[name];
						return;
					}

					method.interceptor = method.interceptor || {};

					method.interceptor.response = transform(method.interceptor.response);
				});

				var Resource = $resource(options.resource.path, options.resource.defaultParameters, options.resource.methods);

				var proto = new Resource();

				Model.prototype = Object.create(proto, {
					constructor: {
						value: Model
					},
					includeProperty: {
						value: function(property) {
							var index = this._ignore.indexOf(property);

							if (index > -1) {
								_.pullAt(this._ignore, index);
							}

							return this;
						}
					},
					ignoreProperty: {
						value: function(property) {
							if (this._ignore.indexOf(property) > -1) {
								this._ignore.push(property);
							}

							return this;
						}
					},
					toJSON: {
						value: function() {
							var result = proto.toJSON.apply(this);

							_.forEach(this._ignore, function iterate(prop) {
								delete result[prop];
							});

							delete result._ignore;

							return result;
						}
					}
				});

				// add sugar method:
				// $delete -> delete
				// $save -> save
				// ...
				_.forEach(options.resource.methods, function iterate(method, name) {
					if (method) {
						if (_.isFunction(proto['$' + name])) {
							proto[name] = proto['$' + name];
						}
					}
				});

				_.forEach(options.resource.methods, function iterate(meta, method) {
					if (meta && _.isFunction(Resource[method])) {
						Model[method] = function() {
							return Resource[method].apply(Model, arguments).$promise;
						};
					}
				});

				return {
					class: Model,
					base: proto
				};
			}
		};
	};

	angular.module('easy-chat').factory('/services/model-factory', [
		'$resource',
		ModelFactory
	]);
})();
