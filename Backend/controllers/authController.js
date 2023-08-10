const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register user
exports.registerUser = async (req, res) => {
  // const newUser =await UserModel.create(req.body);
  //or
  const { password } = req.body
  // to encrypt the password
  const salt = await bcrypt.genSalt(12) //amount of hashing
  const hashPassword = await bcrypt.hash(password, salt)
  req.body.password = hashPassword
  const newUser = new UserModel(req.body)
  try {
    const user = await newUser.save()
    //jwt token generate
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
      user: user,
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message:
        err.code === 11000 ? 'username already registered!!' : err.message,
    })
  }
}

//login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserModel.findOne({ username: username })
    // validate user
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User does not exist',
      })
    }
    const validity = await bcrypt.compare(password, user.password)
    if (!validity) {
      res.status(400).json({
        status: 'success',
        message: 'Wrong password.',
      })
    }
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
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    })
  }
}
