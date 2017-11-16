const { User } = require('../models/user');

const authenticate = async (req, res, next) => {
  const token = req.header('X-AUTH');

  try {
    const user = await User.findByToken(token);
    // const all = await User.find({})
    // console.log(user);
    // console.log(token);
    // console.log(all.filter(user => user.tokens.find(({token}) => token === token)));
    if (user) {
      req.user = user;
      req.token = token;
      next();
    } else {
      res.status(401).send();
    }
  } catch(err) {
    res.status(401).send();
  }
};

module.exports = {
  authenticate
};
