'use strict';

exports._ = '/config/mail';
exports._requires = [
	'@lodash',
	'@bluebird',
	'@nodemailer',
	'@nodemailer-ses-transport',
	'/config/env'
];
exports._factory = function(_, Promise, nodemailer, transport, env) {
	var sender = transport({
		accessKeyId: env.mail.accessKeyId,
		secretAccessKey: env.mail.secretAccessKey,
		region: env.mail.region
	});

	var transporter = nodemailer.createTransport(sender);
	var send = Promise.promisify(transporter.sendMail, transporter);

	var self = {};

	self.send = function(options) {
		options.from = env.mail.from;

		// TODO use ECT to render html from template + data
		return send(options);
	};

	return self;
};
