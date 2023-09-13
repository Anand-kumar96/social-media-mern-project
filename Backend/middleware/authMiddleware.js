const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { asyncHandler } = require('./asyncHandler')
dotenv.config()
const secret = process.env.JWT_KEY

exports.authMiddleWare = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  console.log(token)
  if (token) {
    const decoded = jwt.verify(token, secret)
    console.log(decoded)
    req.body._id = decoded?.id
    next()
  } else {
    next(new Error('You are not authorized for this request!!', 400))
  }
})
