const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createTokenUser } = require('../utils')

const getMyself = async (req, res) => {
  const user = await User.findById(req.user.userId)
  if (!user) {
    throw new CustomError.NotFoundError('User not found')
  }
  const tokenUser = createTokenUser(user)
  res.status(StatusCodes.OK).json({ user: tokenUser })
}

module.exports = {
  getMyself,
}
