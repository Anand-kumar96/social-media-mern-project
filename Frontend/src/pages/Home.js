import React from 'react'
import './Home.css'
import ProfileSide from '../component/ProfileSide'
import PostSide from '../component/PostSide/PostSide'
import RightSide from '../component/RightSide/RightSide'
const Home = () => {
  return (
    <div className="Home">
        <ProfileSide />
        <PostSide />
        <RightSide />
  
    </div>
  )
}

export default Home
