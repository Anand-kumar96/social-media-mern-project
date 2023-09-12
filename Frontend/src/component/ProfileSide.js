import React from 'react'
import './ProfileSide.css'
import LogoSearch from './LogoSearch'
import ProfileCard from './ProfileCard'
import FollowersCard from './FollowersCard'
const ProfileSide = ({show}) => {
  return (
    <div className="profileSide">
      {<LogoSearch />}
      <ProfileCard show={show}/>
      <FollowersCard />
    </div>
  )
}

export default ProfileSide