'use strict';

exports._ = '/models/tenant';
exports._requires = [
	'/config/db'
];
exports._factory = function(db) {
	var schema = new db.Schema({
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		domains: [{
			value: String,
			active: Boolean
		}],
		biography: String,
		plan: {
			type: String,
			default: 'free'
		}
	});

	return db.model('Tenant', schema);
};
