const { asyncHandler } = require('../middleware/asyncHandler')
const MessageModel = require('../models/messageModel')

exports.postMessage = asyncHandler(async (req, res, next) => {
  const { chatId, senderId, text } = req.body
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  })
  if (message) {
    const result = await message.save()
    res.status(201).json({
      status: 'success',
      result,
    })
  } else {
    res.status(400)
    next(new Error('Invalid data !!'))
  }
})

//fetch message
exports.getMessage = asyncHandler(async (req, res, next) => {
  const { chatId } = req.params
  const result = await MessageModel.find({ chatId })
  if (result) {
    res.status(200).json({
      status: 'success',
      result,
    })
  } else {
    res.status(404)
    next(new Error('Message does not exist'))
  }
})
