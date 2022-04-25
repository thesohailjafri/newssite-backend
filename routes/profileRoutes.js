const express = require('express')
const router = express.Router()

const { getMyself } = require('../controllers/profileController')

router.get('/myself', getMyself)

module.exports = router
