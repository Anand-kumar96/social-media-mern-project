import React from 'react'
import './PostSide.css'
import PostShare from '../PostShare/PostShare'
import Posts from '../Posts/Posts'
const PostSide = ({show}) => {
  return (
    <div className="postSide">
      {!show && <PostShare />}
      <Posts />
    </div>
  )
}

export default PostSide