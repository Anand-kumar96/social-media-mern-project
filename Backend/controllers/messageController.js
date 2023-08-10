const MessageModel = require('../models/messageModel')

exports.postMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  })
  try {
    const result = await message.save()
    res.status(200).json({
      status: 'success',
      result,
    })
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    })
  }
}

//fetch message
exports.getMessage = async (req, res) => {
  const { chatId } = req.params
  try {
    const result = await MessageModel.find({ chatId })
    res.status(200).json({
      status: 'success',
      result,
    })
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    })
  }
}
