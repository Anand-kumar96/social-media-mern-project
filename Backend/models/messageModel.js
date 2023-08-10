const mongoose = require('mongoose')
const messageSchema = mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: String,
    text: String,
  },
  {
    timestamps: true,
  }
)

const MessageModel = mongoose.model('Message', messageSchema)
module.exports = MessageModel
