import React from 'react'
import './TrendCard.css'
import { TrendData } from '../../data/TrendData'
const TrendCard = () => {
  return (
    <div className="trendCard">
      <h3>Trends for you</h3>
      {TrendData.map((trend, index) => (
        <div className="trend" key={index}>
          <span>#{trend.name}</span>
          <span>#{trend.shares}k shares</span>
        </div>
      ))}
    </div>
  )
}

export default TrendCard
