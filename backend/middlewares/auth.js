const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError('Необходима авторизовация');
  }

  const token = authorization.split(' ')[1];

  let payload;

  try {
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // eslint-disable-next-line no-console
    throw new UnauthorizedError('Необходима авторизовация');
  }

  req.user = payload;

  return next();
};
