import React from 'react'
import './PostSide.css'
import PostShare from '../PostShare/PostShare'
import Posts from '../Posts/Posts'
import LogoSearch from '../LogoSearch'
import ProfileCard from '../ProfileCard'
import FollowersCard from '../FollowersCard'
import { useSelector } from 'react-redux'
const PostSide = ({ show }) => {
  const profileShow = useSelector((state) => state.profileReducer)
  return (
    <div className="postSide">
      <div className="logo-responsive">
        <LogoSearch />
      </div>
      {profileShow && (
        <div className='profile-responsive'>
          <ProfileCard show={show} />
          <FollowersCard />
        </div>
      )}

      {!show && <PostShare />}
      <Posts />
    </div>
  )
}

export default PostSide
