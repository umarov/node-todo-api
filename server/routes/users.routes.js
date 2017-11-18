const { ObjectId } = require('mongodb');
const _ = require('lodash');

const { User } = require('../models/user');

const postUser = async (req, res) => {
  const body = _.pick(req.body, ['name', 'email', 'password']);

  let user = new User(body);
  try {
    user = await user.save();
    const token = await user.generateAuthToken();
    res.header('X-AUTH', token).send({ user });
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).send({ message: 'Account already exists' });
    } else {
      const { password, email } = e.errors;
      if (password) {
        const minLengthError = 'Your password needs to be minimum 8 characters';
        const noPasswordError = 'Password must be provided';
        const message =
          password.kind === 'minlength' ? minLengthError : noPasswordError;

        res.status(400).send({ message });
      } else if (email) {
        res.status(400).send({ message: email.message });
      } else {
        res.status(400).send({ message: 'Something went wrong' });
      }
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.header('X-AUTH', token).send({ user, token });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    await req.user.removeToken(req.token)
    res.status(200).send();
  } catch(e) {
    res.status(400).send();
  }
}

const showUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(404).send();
    }

    const user = await User.findById(id);

    if (user) {
      res.send({ user });
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(404).send();
  }
};

const getMe = async (req, res) => {
  res.send({ user: req.user });
};

module.exports = {
  postUser,
  loginUser,
  logoutUser,
  showUser,
  getMe
};
