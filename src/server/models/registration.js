'use strict';

exports.name = '/models/registration';
exports.requires = [
	'/config/db'
];
exports.factory = function(db) {
	var registrationSchema = db.Schema({
		code: {
			type: String,
			unique: true
		},
		tenantName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		used: {
			type: Boolean,
			default: false
		}
	});

	return db.model('Registration', registrationSchema);
};
