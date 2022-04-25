const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY
const expires = '1d'

const createToken = async (user) => {
  return jwt.sign(user, secret, { expiresIn: expires })
}

module.exports = createToken
