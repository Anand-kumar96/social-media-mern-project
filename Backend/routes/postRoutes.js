const express = require('express')
const {
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getTimeLinePosts,
} = require('../controllers/postController')
const router = express.Router()
router.post('/', createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timelinePosts', getTimeLinePosts)

module.exports = router
