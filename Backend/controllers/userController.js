const bcrypt = require('bcrypt')
const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { asyncHandler } = require('../middleware/asyncHandler')

//get all user
exports.getAllUser = asyncHandler(async (req, res, next) => {
  const users = await UserModel.find()
  if (!users) {
    // getting CastError later handle it
    res.status(404)
    next(new Error('Users does not exist'))
  }
  const allUsers = users.map((user) => {
    const { password, ...otherDetails } = user._doc
    return otherDetails
  })
  res.status(200).json({
    status: 'success',
    users: allUsers,
  })
})
// get a User from db
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id)
  if (!user) {
    res.status(404)
    next(new Error('Users does not exist'))
  }
  user.password = undefined // to not send password
  res.status(200).json({
    status: 'success',
    user: user,
  })
})

// update a user
exports.updateUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const { _id, currentUserAdmin, password } = req.body
  if (id === _id || currentUserAdmin) {
    if (password) {
      const salt = await bcrypt.genSalt(12)
      req.body.password = await bcrypt.hash(password, salt)
    }
    const user = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (!user) {
      res.status(404)
      next(new Error('User does not exist'))
    }
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    )

    res.status(200).json({
      user,
      token,
    })
  } else {
    res.status(400)
    next(new Error('Access Denied !! You can only update your own profile'))
  }
})

// delete user
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const { currentUserId, currentUserAdmin } = req.body
  if (id === currentUserId || currentUserAdmin) {
    await UserModel.findByIdAndDelete(id)
    res.status(200).json({
      status: 'success',
      message: 'user deleted successfully',
    })
  } else {
    res.status(400)
    next(new Error('Access Denied !! You can only update your own profile'))
  }
})

// follow a user
exports.followUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const { _id: currentUserId } = req.body
  // _id assigned as currentUserId
  if (id === currentUserId) {
    res.status(403)
    next(new Error('Action forbidden'))
  } else {
    const followUser = await UserModel.findById(id)
    const followingUser = await UserModel.findById(currentUserId)
    if (!followUser.followers.includes(currentUserId)) {
      await followUser.updateOne({ $push: { followers: currentUserId } })
      await followingUser.updateOne({ $push: { following: id } })
      res.status(200).json({
        status: 'success',
        message: 'User followed',
      })
    } else {
      res.status(400)
      next(new Error('User is already followed by You'))
    }
  }
})

// unFollow user
exports.unFollowUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const { _id: currentUserId } = req.body
  if (id === currentUserId) {
    res.status(403)
    next(new Error('Action forbidden'))
  } else {
    const followUser = await UserModel.findById(id)
    const followingUser = await UserModel.findById(currentUserId)
    if (followUser.followers.includes(currentUserId)) {
      await followUser.updateOne({ $pull: { followers: currentUserId } })
      await followingUser.updateOne({ $pull: { following: id } })
      res.status(200).json({
        status: 'success',
        message: 'User unFollowed',
      })
    } else {
      res.status(400)
      next(new Error('User is not followed by You'))
    }
  }
})
