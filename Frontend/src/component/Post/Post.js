import React, { useState } from 'react'
import './Post.css'
import { format } from 'timeago.js'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Like from '../../img/like.png'
import DisLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import { likePost } from '../../api/postRequest'
const Post = ({ data, userInfo }) => {
  const [likes, setLikes] = useState(data.likes.length) // total likes
  const { user } = useSelector((state) => state.authReducer.authData)
  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const handleLikeAndDislike = () => {
    setLiked((prev) => !prev)
    likePost(data._id, user._id) // data._id=> post id user_id=> user id
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }
  return (
    <div className="post">
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <img
          src={
            userInfo?.profilePicture
              ? process.env.REACT_APP_PUBLIC_FOLDER + userInfo.profilePicture
              : process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'
          }
          style={{
            width: '40px',
            height: '40px',
            marginRight: '0.7rem',
            borderRadius: '50%',
          }}
          alt=""
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3px'
          }}
        >
          <span className='post-user'
          >{`${userInfo?.firstname} ${userInfo?.lastname}`}</span>
          <span className='post-createdAt'>
            {format(data?.createdAt)}
          </span>
        </div>
      </div>
      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
      {data.image && process.env.REACT_APP_PUBLIC_FOLDER + data.image && (
        <img
          src={data.image && process.env.REACT_APP_PUBLIC_FOLDER + data.image}
          alt=""
        />
      )}
      <div className="postReact">
        <img
          src={liked ? Like : DisLike}
          alt="like"
          onClick={handleLikeAndDislike}
        />
        <img src={Comment} alt="comment" />
        <img src={Share} alt="share" />
      </div>
      <span style={{ color: 'var(--gray)', fontSize: '14px' }}>
        {likes} likes
      </span>
    </div>
  )
}

export default Post
