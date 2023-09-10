const { default: mongoose } = require('mongoose')
const PostModel = require('../models/postModel')
const UserModel = require('../models/userModel')
const { asyncHandler } = require('../middleware/asyncHandler')

// create post
exports.createPost = asyncHandler(async (req, res, next) => {
  const newPost = new PostModel(req.body)
  if (newPost) {
    const post = await newPost.save()
    res.status(201).json({
      status: 'success',
      newPost: post,
      message: 'post created',
    })
  } else {
    res.status(400)
    next(new Error('Invalid data'))
  }
})

// getPost
exports.getPost = asyncHandler(async (req, res, next) => {
  const id = req.params.id
  const post = await PostModel.findById(id)
  if (!post) {
    res.status(500)
    next(new Error('Post does not exist !!'))
  }
  res.status(200).json({
    status: 'success',
    post: post,
  })
})

//update a post
exports.updatePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.id
  const { userId } = req.body
  const post = await PostModel.findById(postId)
  if (post && post.userId === userId) {
    await post.updateOne({ $set: req.body })
    res.status(200).json({
      status: 'success',
      message: 'Post updated.',
    })
  } else {
    res.status(403)
    next(new Error('Action forbidden'))
  }
})

//delete a post
exports.deletePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.id
  const { userId } = req.body
  const post = await PostModel.findById(postId)
  if (post && post.userId === userId) {
    await post.deleteOne({ id: postId })
    res.status(200).json({
      status: 'success',
      message: 'post deleted',
    })
  } else {
    res.status(403)
    next(new Error('Action forbidden'))
  }
})

//like/dislike
exports.likePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.id
  const { userId } = req.body
  const post = await PostModel.findById(postId)
  if (post) {
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } })
      res.status(200).json({
        status: 'success',
        message: 'post liked successfully',
      })
    } else {
      //dislike
      await post.updateOne({ $pull: { likes: userId } })
      res.status(200).json({
        status: 'success',
        message: 'post disliked successfully',
      })
    }
  } else {
    res.status(400)
    next(new Error('Post does not exist'))
  }
})

// get timeline of post // timelinePost => is own post and post of users he is following
exports.getTimeLinePosts = asyncHandler(async (req, res, next) => {
  const userId = req.params.id
  const currentUserPosts = await PostModel.find({ userId }) // all post of currentUser
  if (currentUserPosts) {
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId), // since it is an object gives all following user in array
        },
      },
      {
        $lookup: {
          from: 'posts',
          localField: 'following',
          foreignField: 'userId',
          as: 'followingPosts',
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ])
    // console.log(followingPosts)
    const allPosts = currentUserPosts
      .concat(followingPosts[0].followingPosts)
      .sort((a, b) => b.createdAt - a.createdAt)
    res.status(200).json({
      status: 'success',
      posts: allPosts,
    })
  } else {
    res.status(400)
    next(new Error('No post Found'))
  }
})
