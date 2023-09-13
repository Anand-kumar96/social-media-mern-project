const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { asyncHandler } = require('../middleware/asyncHandler')

// register user
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body
  const existingUser = await UserModel.findOne({ username })
  if (existingUser) {
    res.status(403)
    next(new Error('user already exists!!'))
  }
  // to encrypt the password
  const salt = await bcrypt.genSalt(12) //amount of hashing
  const hashPassword = await bcrypt.hash(password, salt)
  req.body.password = hashPassword

  const newUser = new UserModel(req.body)
  const user = await newUser.save()
  if (user) {
    //jwt token generate
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    )
    res.status(201).json({
      status: 'success',
      token,
      user: user,
    })
  } else {
    res.status(400)
    next(new Error('Invalid user data'))
  }
})

//login user
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body
  const user = await UserModel.findOne({ username })
  if (!user) {
    res.status(401)
    next(new Error('Invalid email or password'))
  }
  const validity = await bcrypt.compare(password, user.password)
  if (user && validity) {
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    )
    res.status(200).json({
      status: 'success',
      token,
      user,
    })
  } else {
    res.status(401)
    next(new Error('Invalid email or password'))
  }
})
