const express = require('express');
const { findChat, userChats, createChat } = require('../controllers/chatController');
const router = express.Router();

router.post('/',createChat) //create chat
router.get('/:userId',userChats) // to get all user
router.get('/find/:firstId/:secondId',findChat)//get 1st & 2nd user
module.exports = router;