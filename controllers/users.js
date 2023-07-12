const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => handleThen(user, res))
        .catch((error) => handleCatch(error, res));
    });
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id });
      res.cookie('jwt', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      }).end();
      res.send(user);
    })
    .catch((error) => handleCatch(error, res));
};
