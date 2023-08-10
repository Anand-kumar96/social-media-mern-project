const express = require('express')
const {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
  getAllUser,
} = require('../controllers/userController')
const { authMiddleWare } = require('../middlwware/authMiddleware')

const router = express.Router()
router.get('/',getAllUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id',authMiddleWare, deleteUser)
router.put('/:id/follow', followUser)
router.put('/:id/unFollow', unFollowUser)

module.exports = router
