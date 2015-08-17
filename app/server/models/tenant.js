'use strict';

exports._ = '/models/tenant';
exports._requires = [
	'/config/db'
];
exports._factory = function(db) {
	var schema = new db.Schema({
		displayName: {
			type: String,
			required: true
		},
		plan: {
			type: String,
			default: 'free'
		}
	});

	var model = db.model('Tenant', schema);

	return model;
};
