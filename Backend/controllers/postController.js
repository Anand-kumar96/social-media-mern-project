const { default: mongoose } = require('mongoose')
const PostModel = require('../models/postModel')
const UserModel = require('../models/userModel')

// create post
exports.createPost = async (req, res) => {
  const newPost = new PostModel(req.body)
  try {
    const post = await newPost.save()
    res.status(201).json({
      status: 'success',
      newPost:post,
      message: 'post created',
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    })
  }
}

// getPost
exports.getPost = async (req, res) => {
  const id = req.params.id
  try {
    const post = await PostModel.findById(id)
    if (!post) {
      res.status(500).json({
        status: 'error',
        message: 'Post does not exist with this id.',
      })
    }
    res.status(200).json({
      status: 'success',
      post: post,
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    })
  }
}

//update a post
exports.updatePost = async (req, res) => {
  const postId = req.params.id
  const { userId } = req.body
  try {
    const post = await PostModel.findById(postId)
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body })
      res.status(200).json({
        status: 'success',
        message: 'Post updated.',
      })
    } else {
      res.status(403).json({
        status: 'success',
        message: 'Action forbidden',
      })
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    })
  }
}

//delete a post
exports.deletePost = async (req, res) => {
  const postId = req.params.id
  const { userId } = req.body
  try {
    const post = await PostModel.findById(postId)
    if (post.userId === userId) {
      await post.deleteOne({ id: postId })
      res.status(200).json({
        status: 'success',
        message: 'post deleted',
      })
    } else {
      res.status(403).json({
        status: 'success',
        message: 'Action forbidden',
      })
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    })
  }
}

//like/dislike
exports.likePost = async (req, res) => {
  const postId = req.params.id
  const { userId } = req.body
  try {
    const post = await PostModel.findById(postId)
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
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    })
  }
}

// get timeline of post // timelinePost => is own post and post of users he is following
exports.getTimeLinePosts = async (req, res) => {
  const userId = req.params.id
  try {
    const currentUserPosts = await PostModel.find({ userId: userId }) // all post of currentUser
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
      //field i want to return
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ])
    //    console.log(followingPosts[0].followingPosts)
    // sort in decreasing order
    const allPosts = currentUserPosts
      .concat(followingPosts[0].followingPosts)
      .sort((a, b) => b.createdAt - a.createdAt)
    res.status(200).json({
      status: 'success',
      posts: allPosts,
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    })
  }
}

// to update $set , to insert $push to remove $pull in array
//lookup =>
/*The 
$lookup  stage adds a new array field to each input document. The new array field contains the matching documents from the "joined" collection. The $lookup stage passes these reshaped documents to the next stage.*/
