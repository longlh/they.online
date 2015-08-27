'use strict';

exports._ = '/middlewares/registration';
exports._requires = [
	'@lodash',
	'@bluebird',
	'@node-uuid',
	'/models/registration',
	'/models/tenant',
	'/models/agent',
	'/config/mail'
];
exports._factory = function(_, Promise, UUID, Registration, Tenant, Agent, mail) {
	var self = {};

	self.accept = function(req, res, next) {
		// TODO validate
		var data = req.body;

		var registration = new Registration({
			code: UUID.v4(),
			tenantName: data.name || 'Tenant',
			email: data.email || 'reg@dapps.me',
			domain: data.domain || 'dapps.me'
		});

		// save the registration
		registration.save(function(err, registration) {
			if (err) {
				console.error(err);
				return next(err);
			}

			// redirect & send email
			res.redirect('/sign-up');

			// send email
			console.log('Sending mail...');

			mail.send({
				to: registration.email,
				subject: 'Welcome to they.online',
				html: '<a href="http://192.168.164.128:3000/registration/activate/' + registration.code + '">Active your account</h1>'
			}).then(function(result) {
				console.log('Mail sent!', result);
			}).catch(function(err) {
				console.error(err);

				// TODO add to retry batch
			});
		});
	};

	self.identify = function(identifier) {
		return function(req, res, next) {
			var query;

			if (typeof identifier === 'string') {
				var id = req.params[identifier];

				query = Registration.findById(id);
			} else {
				// create a hash object for search conditions
				var conditions = {};

				_.forEach(identifier, function(param, condition) {
					conditions[condition] = req.params[param];
				});

				query = Registration.findOne(conditions);
			}

			return Promise.resolve(query.exec()).then(function(registration) {
				res.locals._registration = registration;

				next();
			}).catch(next);
		};
	};

	self.activateTenant = function(req, res, next) {
		var registration = res.locals._registration;

		// TODO check registration is used or not

		var tenant = new Tenant({
			name: registration.tenantName,
			email: registration.email,
			domains: [{
				value: registration.domain,
				active: true
			}]
		});

		tenant.save(function(error, tenant) {
			if (error) {
				return next(error);
			}

			res.locals._tenant = tenant;

			next();
		});
	};

	self.activateAgent = function(req, res, next) {
		var agent = new Agent({
			name: req.body.name,
			tenant: res.locals._tenant._id,
			admin: true
		});

		agent.accounts.push({
			kind: 'internal',
			uid: req.body.account,
			password: req.body.password
		});

		agent.save(function(error, agent) {
			if (error) {
				return next(error);
			}

			res.locals._agent = agent;

			next();
		});
	};

	self.finish = function(req, res, next) {
		var query = Registration.findByIdAndUpdate(res.locals._registration._id, {
			used: true
		});

		Promise.resolve(query.exec()).then(function() {
			next();
		}).catch(next);
	};

	return self;
};
