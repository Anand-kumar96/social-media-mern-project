const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { asyncHandler } = require('./asyncHandler')
dotenv.config()
const secret = process.env.JWT_KEY

exports.authMiddleWare = asyncHandler(async (req, res, next) => {
  if(req.headers.Authorization){
  const token = req.headers.Authorization.split(' ')[1]
  console.log(token)
  if (token) {
    const decoded = jwt.verify(token, secret)
    console.log(decoded)
    req.body._id = decoded?.id
    next()
  } else {
    next(new Error('You are not authorized for this request!!', 400))
  }
}else{
   next(new Error('You are not logged In', 400))
}
})
