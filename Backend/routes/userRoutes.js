const express = require('express')
const {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
  getAllUser,
} = require('../controllers/userController')
const { authMiddleWare } = require('../middleware/authMiddleware')

const router = express.Router()
router.get('/', getAllUser)
router.get('/:id', getUser)
router.put('/:id', authMiddleWare, updateUser)
router.delete('/:id', authMiddleWare, deleteUser)
router.put('/:id/follow', authMiddleWare, followUser)
router.put('/:id/unFollow', authMiddleWare, unFollowUser)

module.exports = router
