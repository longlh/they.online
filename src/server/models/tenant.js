'use strict';

exports.name = '/models/tenant';
exports.requires = [
	'/config/db'
];
exports.factory = function(db) {
	var schema = new db.Schema({
		name: {
			type: String,
			required: true
		},
		biography: String,
		email: String,
		plan: {
			type: String,
			default: 'free'
		}
	});

	return db.model('Tenant', schema);
};
