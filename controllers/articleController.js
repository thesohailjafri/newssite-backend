const Article = require('../models/Article')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createTokenUser } = require('../utils')

const createArticle = async (req, res) => {
  const { title, image, tags, content } = req.body
  if (!title || !image || !tags || !content) {
    throw new CustomError.BadRequestError(
      'Please provide title, image, tags and content',
    )
  }
  const article = await Article.create({
    title,
    image,
    tags,
    content,
    author: req.user.username,
    authorId: req.user.userId,
  })
  await article.save()
  res.status(StatusCodes.CREATED).json({
    msg: 'Article created',
  })
}

const readMyArticles = async (req, res) => {
  const articles = await Article.find({ authorId: req.user.userId })
  res.status(StatusCodes.OK).json({ articles })
}

const deleteMyArticle = async (req, res) => {
  const { articleId } = req.params
  const article = await Article.findById(articleId)
  if (!article) {
    throw new CustomError.NotFoundError('Article not found')
  }
  if (article.authorId.toString() !== req.user.userId.toString()) {
    throw new CustomError.UnauthorizedError('You are not the author')
  }
  await article.remove()
  res.status(StatusCodes.OK).json({ msg: 'Article deleted' })
}

module.exports = {
  createArticle,
  readMyArticles,
  deleteMyArticle,
}
