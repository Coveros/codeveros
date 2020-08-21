const { utils, orm } = require('@coveros/codeveros-ms');
const bcrypt = require('bcrypt');

const validator = require('validator');

const schema = new orm.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
      sparse: true
    }
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: v => validator.isEmail(v, { require_tld: false }),
      message: 'invalid email'
    }
  },
  password: {
    type: String
  }
}, {
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    },
    versionKey: false
  }
});

schema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      await this.hashPassword();
    } catch (err) {
      return next(err);
    }
    next();
  }
});

schema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

schema.methods.hashPassword = async function () {
  if (!this.password) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

module.exports = utils.loadModel('User', schema);
