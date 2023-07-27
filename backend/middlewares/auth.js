const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  let token;
  let payload;

  try {
    token = req.cookies.jwt;
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // eslint-disable-next-line no-console
    throw new UnauthorizedError('Необходима авторизовация');
  }

  req.user = payload;

  return next();
};
