const { User } = require('../models/user');

const authenticate = async (req, res, next) => {
  const token = req.header('X-AUTH');

  try {
    const user = await User.findByToken(token);
    if (user) {
      req.user = user;
      req.token = token;
      next();
    } else {
      res.status(401).send();
    }
  } catch (err) {
    res.status(401).send();
  }
};

module.exports = {
  authenticate
};
