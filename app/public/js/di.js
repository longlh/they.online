;(function(exports) {
	'use strict';

	var Dependency = function(args) {
		this.factory = args.pop();
		this.requires = args;
	};

	var Context = function() {
		this.container = {};
		this.cache = {};
		this.autoload = [];
	};

	var proto = Context.prototype;

	proto.register = function(name, args, autoload) {
		if (this.container[name]) {
			throw new Error('Dependency [' + name + '] has been registered!');
		}

		this.container[name] = new Dependency(args);

		if (autoload) {
			this.autoload.push(name);
		}

		return this;
	};

	proto.get = function(name) {
		// look at cache
		if (this.cache[name]) {
			return this.cache[name];
		}

		// look at container
		var dependency = this.container[name];

		if (!dependency) {
			throw new Error('Dependency [' + name + '] is not registered yet!');
		}

		// resolve requires
		var requires = dependency.requires.map(function(name) {
			return this.get(name);
		}, this);

		this.cache[name] = dependency.factory.apply(this, requires);

		return this.cache[name];
	};

	proto.bootstrap = function() {
		this.autoload.forEach(function(name) {
			this.get(name);
		}, this);
	};

	var contexts = {};

	exports.__ = function(name) {
		if (!contexts[name]) {
			contexts[name] = new Context();
		}

		return contexts[name];
	};
})(window);
