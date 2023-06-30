const User = require('../models/user');
const { handleThen, handleCatch } = require('../helpers/handlingErrors');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => handleThen(users, res))
    .catch((error) => handleCatch(error, res));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => handleThen(user, res))
    .catch((error) => handleCatch(error, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => handleThen(user, res))
    .catch((error) => handleCatch(error, res));
};

module.exports.changeUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => handleThen(user, res))
    .catch((error) => handleCatch(error, res));
};

module.exports.changeAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => handleThen(user, res))
    .catch((error) => handleCatch(error, res));
};
