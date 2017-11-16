const { User} = require('../../models/user')

const user = {
  email: 'test@test.com',
  password: 'userTwoPass'
};

async function createUser() {
  await User.remove({});
  return new User(user).save();
}

async function getAuthToken() {
  const user = await createUser();
  const token = await user.generateAuthToken();
  return token;
}

module.exports = {
  getAuthToken
}
