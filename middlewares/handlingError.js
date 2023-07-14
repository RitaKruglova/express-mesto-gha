const mongoose = require('mongoose');
const errors = require('../helpers/errors');

module.exports.handleCatch = (err, req, res, next) => {
  let verifiedError = err;
  console.log('err', err);
  if (err.code === 11000) {
    verifiedError = new errors.ConflictError('Пользователь с таким email уже существует');
  }
  if (err instanceof mongoose.Error.ValidationError) {
    verifiedError = new errors.ValidationError(err.message);
  }
  if (verifiedError.statusCode) {
    res.status(verifiedError.statusCode).send({ messege: verifiedError.message });
  } else {
    res.status(500).send({ messege: 'Что-то пошло не так...(' });
  }
};
