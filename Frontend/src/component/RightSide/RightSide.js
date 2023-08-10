import React from 'react'
import './RightSide.css'
import TrendCard from '../TrendCard/TrendCard'
import { useState } from 'react'
import ShareModal from '../ShareModal'
import NavIcons from '../NavIcons'
const RightSide = () => {
  const[modalOpen,setModalOpen]=useState(false);
  return (
    <div className="rightSide">
      <div className="navIconsRight">
        <NavIcons />
      </div>
      <TrendCard />
      <button className="button ts" onClick={() => setModalOpen(true)}>
        Share
      </button>
      <ShareModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
    </div>
  )
}

export default RightSide