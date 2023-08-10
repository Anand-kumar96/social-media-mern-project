const express = require('express')
const { getMessage, postMessage } = require('../controllers/messageController')
const router = express.Router()
// two routes for post and get
router.post('/', postMessage)
router.get('/:chatId', getMessage)

module.exports = router
