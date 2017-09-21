const { ObjectId } = require('mongodb');
const _            = require('lodash');

const { User } = require('../models/user');


const postUser = async (req, res) => {
  const body = _.pick(req.body, ['name', 'email', 'password']);

  let user = new User(body);
  try {
    user = await user.save();
    const token = await user.generateAuthToken();
    res.header('X-AUTH', token).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.header('X-AUTH', token).send({ user, token });
  } catch(err) {
    res.status(401).send(err);
  }
};

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
  } catch(err) {
    res.status(404).send();
  }
};

const getMe = async (req, res) => {
  res.send({ user: req.user });
};

module.exports = {
  postUser,
  loginUser,
  showUser,
  getMe
}
