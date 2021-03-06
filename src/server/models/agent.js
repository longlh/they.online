'use strict';

exports.name = '/models/agent';
exports.requires = [
	'@lodash',
	'@crypto',
	'/config/db'
];
exports.factory = function(_, crypto, db) {
	// sub-document
	var accountSchema = new db.Schema({
		uid: {
			type: String,
			required: true
		},
		kind: {
			type: String,
			required: true
		},
		salt: String,
		hashedPassword: String
	});

	accountSchema.index({
		uid: 1,
		kind: -1
	}, {
		unique: true,
		sparse: true
	});

	// methods
	accountSchema.methods = {
		makeSalt: function() {
			return crypto.randomBytes(1 << 4).toString('base64');
		},
		makeHashedPassword: function(password) {
			if (!password || !this.salt) {
				return '';
			}

			var salt = new Buffer(this.salt, 'base64');

			return crypto.pbkdf2Sync(password, salt, 1 << 10, 1 << 6).toString('base64');
		},
		authenticate: function(password) {
			return this.makeHashedPassword(password) === this.hashedPassword;
		},
		toJSON: function() {
			var raw = this.toObject();

			// omit sensitive data
			raw.salt = undefined;
			raw.hashedPassword = undefined;

			return raw;
		}
	};

	// virtuals
	accountSchema.virtual('password').set(function(password) {
		this.salt = this.makeSalt();
		this.hashedPassword = this.makeHashedPassword(password);
	});

	// main document
	var agentSchema = db.Schema({
		tenant: {
			type: db.Schema.Types.ObjectId,
			ref: 'Tenant',
			required: true
		},
		admin: {
			type: Boolean,
			default: false
		},
		accounts: [accountSchema],
		profile: {
			name: String,
			email: String,
			phone: String,
			information: String
		}
	});

	agentSchema.methods = {
		authenticate: function(password) {
			var internalAccount = _.find(this.accounts, {
				kind: 'internal'
			});

			return internalAccount && internalAccount.authenticate(password);
		}
	};

	return db.model('Agent', agentSchema);
};
