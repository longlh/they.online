'use strict';

exports._ = '/server/models/tenant';
exports._requires = [
	'/server/core/db'
];
exports._factory = function(db) {
	var schema = new db.Schema({
		displayName: {
			type: String,
			required: true
		},
		plan: String
	});

	var model = db.model('Tenant', schema);

	return model;
};
