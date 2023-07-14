require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  const { SECRET_KEY } = process.env;

  if (!token) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  return next();
};
