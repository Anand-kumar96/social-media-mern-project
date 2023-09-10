const { asyncHandler } = require('../middleware/asyncHandler')
const ChatModel = require('../models/chatModel')

// createChat
exports.createChat = asyncHandler(async (req, res, next) => {
  const { senderId, receiverId } = req.body
  const newChat = new ChatModel({
    members: [senderId, receiverId],
  })
  const chat = await ChatModel.findOne({
    members: { $all: [senderId, receiverId] },
  })
  if (!chat) {
    const result = await newChat.save()
    res.status(200).json({
      status: 'success',
      result,
    })
  } else {
    res.status(200).json({
      status: 'success',
      message :'user already exists'
    })
  }
})

exports.userChats = asyncHandler(async (req, res, next) => {
  const chat = await ChatModel.find({
    members: { $in: [req.params.userId] },
  })
  if (chat) {
    res.status(200).json({
      status: 'success',
      chat,
    })
  } else {
    res.status(404)
    next(new Error('chat does not exist'))
  }
})

exports.findChat = asyncHandler(async (req, res, next) => {
  const chat = await ChatModel.findOne({
    members: { $all: [req.params.firstId, req.params.secondId] },
  })
  if (chat) {
    res.status(200).json({
      status: 'success',
      chat,
    })
  } else {
    res.status(404)
    next(new Error('chat does not exist'))
  }
})
