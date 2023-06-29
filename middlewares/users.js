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
