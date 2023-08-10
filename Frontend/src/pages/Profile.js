import React from 'react'
import './Profile.css'
import ProfileLeft from '../component/ProfileLeft'
import ProfileCard from '../component/ProfileCard'
import PostSide from '../component/PostSide/PostSide'
import RightSide from '../component/RightSide/RightSide'
const Profile = () => {
  return (
    <div className="profile">
      <ProfileLeft />
      <div className="profile-center">
        <ProfileCard location="profilePage" />
        <PostSide />
      </div>
      <RightSide />
    </div>
  )
}

export default Profile
