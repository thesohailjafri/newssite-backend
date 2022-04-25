const express = require('express')
const router = express.Router()

const {
  createArticle,
  readMyArticles,
  deleteMyArticle,
} = require('../controllers/articleController')

router.route('/').post(createArticle)
router.route('/my').get(readMyArticles)
router.route('/my/:articleId').delete(deleteMyArticle)

module.exports = router
