const createTokenUser = (user) => {
  return { userId: user._id, email: user.email, username: user.username }
}

module.exports = createTokenUser
