const bcrypt = require('bcrypt')
const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

//get all user
exports.getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users) {
      // getting CastError later handle it
      return res.status(404).json({
        status: 'error',
        message: 'Users does not exist',
      })
    }
    const allUsers = users.map((user)=>{
      const{password,...otherDetails}=user._doc;
      return otherDetails;
    })
    res.status(200).json({
      status: 'success',
      users: allUsers,
    })
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    })
  }
}
// get a User from db
exports.getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    if (!user) {
      // getting CastError later handle it
      return res.status(404).json({
        status: 'error',
        message: 'User does not exist',
      })
    }
    user.password = undefined // to not send password
    res.status(200).json({
      status: 'success',
      user: user,
    })
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    })
  }
}

// update a user
exports.updateUser = async (req, res) => {
  const id = req.params.id
  const { _id, currentUserAdmin, password } = req.body

  // 2 case user update his own id or admin update   // when interact with database use try catch
  if (id === _id || currentUserAdmin) {
    // if admin then it also update user if id not match in body
    try {
      if (password) {
        const salt = await bcrypt.genSalt(12)
        req.body.password = await bcrypt.hash(password, salt)
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      }) // i want update user i.e. new
      if (!user) {
        // getting CastError later handle it
        return res.status(404).json({
          status: 'error',
          message: 'User does not exist',
        })
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
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: err.message,
      })
    }
  } else {
    return res.status(403).json({
      status: 'error',
      message: 'Access Denied !! You can only update your own profile',
    })
  }
}

// delete user
exports.deleteUser = async (req, res) => {
  const id = req.params.id
  const { currentUserId, currentUserAdmin } = req.body
  if (id === currentUserId || currentUserAdmin) {
    try {
      await UserModel.findByIdAndDelete(id)
      res.status(200).json({
        status: 'success',
        message: 'user deleted successfully',
      })
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: err.message,
      })
    }
  } else {
    return res.status(404).json({
      status: 'error',
      message: 'Access Denied !! You can only delete your own profile',
    })
  }
}

// follow a user
exports.followUser = async (req, res) => {
  const id = req.params.id
  const { _id: currentUserId } = req.body
  // _id assigned as currentUserId
  if (id === currentUserId) {
    return res.status(403).json({
      status: 'success',
      message: 'Action forbidden',
    })
  } else {
    try {
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
        res.status(403).json({
          status: 'success',
          message: 'User is already followed by You',
        })
      }
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: err.message,
      })
    }
  }
}

// unFollow user
exports.unFollowUser = async (req, res) => {
  const id = req.params.id
    const { _id: currentUserId } = req.body
  if (id === currentUserId) {
    return res.status(403).json({
      status: 'success',
      message: 'Action forbidden',
    })
  } else {
    try {
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
        res.status(403).json({
          status: 'success',
          message: 'User is not followed by You',
        })
      }
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: err.message,
      })
    }
  }
}
