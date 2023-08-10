import React from 'react'
import PostSide from '../component/PostSide/PostSide'
import RightSide from '../component/RightSide/RightSide'
import './Profile.css'
import ProfileSide from '../component/ProfileSide'


const UserPage = () => {
  return (
    <div className="profile">
      <ProfileSide show={true} />
      <div className="profile-center">
        <PostSide show={true} />
      </div>
      <RightSide />
    </div>
  )
}

export default UserPage