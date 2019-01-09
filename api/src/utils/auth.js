const { AuthenticationError } = require('apollo-server-lambda');
const jwt = require('jsonwebtoken');

const getUser = headers => {
  const authorization = headers.authorization || headers.Authorization;

  if (!authorization) {
    throw new AuthenticationError('Missing authorization header');
  }

  const token = authorization.replace('Bearer ', '');

  try {
    return jwt.verify(token, process.env.APP_SECRET);
  } catch (error) {
    throw new AuthenticationError(error.message);
  }
};

module.exports = {
  getUser
};
