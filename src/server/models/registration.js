'use strict';

exports._ = '/models/registration';
exports._requires = [
	'/config/db'
];
exports._factory = function(db) {
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
