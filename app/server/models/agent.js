'use strict';

exports._ = '/models/agent';
exports._requires = [
	'@lodash',
	'@crypto',
	'/config/db'
];
exports._factory = function(_, crypto, db) {
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
			delete raw.salt;
			delete raw.hashedPassword;

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
		name: String,
		tenant: {
			type: db.Schema.Types.ObjectId,
			ref: 'Tenant',
			required: true
		},
		admin: {
			type: Boolean,
			default: false
		},
		accounts: [accountSchema]
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
