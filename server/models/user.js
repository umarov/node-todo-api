const mongoose  = require('mongoose');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const _         = require('lodash');
const argon2    = require('argon2');

const UserSchema = new mongoose.Schema({
  name: {
    type: 'String',
    required: false,
    trim: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch(err) {
    return Promise.reject(err);
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = async function(email, password) {
  const User = this;
  const user = await User.findOne({ email });

  if (!user) { throw new Error('User was not found'); }

  if (await user.matchingPassword(password)) {
    return user;
  } else {
    throw new Error('Password did not match');
  }
};

const options = {
  timeCost: 4, memoryCost: 13, parallelism: 2, type: argon2.argon2d
};

UserSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    try {
      const hashedPassword = await argon2.hash(user.password, options);
      user.password = hashedPassword;
      next();
    } catch(err) {
      next(err);
    }

  } else { next(); };
});

UserSchema.methods.toJSON = function() {
  const user = this;

  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.matchingPassword = function(password) {
  const user = this;

  return argon2.verify(user.password, password)
}

UserSchema.methods.generateAuthToken = async function() {
  const user = this;

  var access = 'auth';
  const token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, process.env.JWT_SECRET, { expiresIn: '1 day' }).toString();

  user.tokens.push({
    access,
    token
  });

  await user.save()

  return token
}

const User = mongoose.model('User', UserSchema);


module.exports = {
  User
};
