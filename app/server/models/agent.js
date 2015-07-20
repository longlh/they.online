'use strict';

exports._ = '/server/models/agent';
exports._requires = [
	'/server/core/db'
];
exports._factory = function(db) {
	// sub-document
	var accountSchema = new db.Schema({
		uid: {
			type: String,
			required: true
		},
		provider: {
			type: String,
			required: true
		},
		salt: String,
		hashedPassword: String
	});

	accountSchema.index({
		uid: 1,
		provider: -1
	}, {
		unique: true,
		sparse: true
	});

	// main document
	var agentSchema = db.Schema({
		uid: {
			type: String,
			required: true,
			unique: true
		},
		displayName: String,
		tenant: {
			type: db.Schema.ObjectId('Tenant'),
			required: true
		},
		admin: {
			type: Boolean,
			default: false
		},
		accounts: [accountSchema]
	});

	var model = db.model('Agent', agentSchema);

	return model;
};
