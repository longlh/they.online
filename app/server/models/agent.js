'use strict';

exports._ = '/server/models/agent';
exports._requires = [
	'/server/core/db'
];
exports._factory = function(db) {
	var schema = db.Schema({
		uid: {
			type: String,
			required: true,
			unique: true
		},
		displayName: String
	});

	var model = db.model('Agent', schema);

	return model;
};
