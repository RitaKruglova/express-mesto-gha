const User = require('../models/user');

module.exports.doesUserExist = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users[req.params.userId]) {
        res.send('Такого пользователя не существует');
        return;
      }
      next();
    });
};

module.exports.putUser = (req, res, next) => {
  console.log('set user');
  req.user = {
    _id: '649d764cbd4837b4ec55342c',
  };

  next();
};
