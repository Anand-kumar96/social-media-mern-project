import React from 'react'
import './ProfileSide.css'
import LogoSearch from './LogoSearch'
import FollowersCard from './FollowersCard'
import InfoCard from './InfoCard'
const ProfileLeft = () => {
  return (
    <div className="profileSide">
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  )
}

export default ProfileLeft