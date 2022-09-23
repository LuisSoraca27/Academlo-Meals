const { User } = require("../models/users.models");

const userExist = async (req, res, next) => {

  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    res.status(404).json({
        status: 'error',
        message: 'user does not exist'
    })
  }
  req.user = user;
  next();
};

module.exports = {
    userExist,
}