require('dotenv').config();
const jwt = require('jsonwebtoken');
const errors = require('../helpers/errors');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  const { SECRET_KEY } = process.env;

  if (!token) {
    next(new errors.UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch {
    next(new errors.UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
