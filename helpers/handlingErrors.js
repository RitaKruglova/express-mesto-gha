const mongoose = require('mongoose');
const errors = require('./errors');

module.exports.handleCatch = (err, res) => {
  let verifiedError = err;
  if (err instanceof mongoose.Error.ValidationError) {
    verifiedError = new errors.ValidationError(err.message);
  }
  if (verifiedError.statusCode) {
    res.status(verifiedError.statusCode).send({ messege: verifiedError.message });
  } else {
    res.status(500).send({ messege: 'Что-то пошло не так...(' });
  }
};

module.exports.handleThen = (data, res) => {
  if (data === null) {
    res.status(404).send({ messege: 'Объект не найден' });
  } else {
    res.set({
      'Content-Security-Policy': 'default-src "self"',
    })
      .send({ data });
  }
};
