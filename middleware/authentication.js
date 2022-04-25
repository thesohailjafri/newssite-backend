const CustomError = require('../errors')
const { isTokenValid } = require('../utils')
const jwt = require('jsonwebtoken')
const authenticateUser = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization']
    if (!bearerHeader || bearerHeader.split(' ')[0] !== 'Bearer') {
      throw new error.UnauthorizedError('No token provided')
    }
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    const tokenUser = jwt.verify(bearerToken, process.env.SECRET_KEY)
    req.user = tokenUser
    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid')
  }
}

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route',
      )
    }
    next()
  }
}

module.exports = {
  authenticateUser,
  authorizePermissions,
}
