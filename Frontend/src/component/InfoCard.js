import React, { useEffect } from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import { useState } from 'react'
import ProfileModal from './ProfileModal'
import { useSelector, useDispatch } from 'react-redux'
import * as UserApi from '../api/UserRequest'
import { useParams } from 'react-router-dom'
import { logOut } from '../actions/AuthAction'

const InfoCard = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()
  const params = useParams()
  const profileUserId = params.id // because in parameter it has id fetching
  const [profileUser, setProfileUser] = useState({})
  const { user } = useSelector((state) => state.authReducer.authData)

  const handleLogOut = () => {
    dispatch(logOut()) // while dispatching call the function
  }
  
  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user)
      } else {
        const profileUser = await UserApi.getUser(profileUserId)
        setProfileUser(profileUser)
      }
    }
    fetchProfileUser()
  }, [user])

  return (
    <div className="infoCard">
      <div className="infoHead">
        <h4>Profile Info </h4>
        {profileUserId === user._id ? (
          <div>
            <UilPen className="pencilIcon" onClick={() => setModalOpen(true)} />
            <ProfileModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              data={user}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="info">
        <span>
          <b>status </b>
          <span>{profileUser.relationShip}</span>
        </span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
          <span>{profileUser.livesIn}</span>
        </span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
          <span>{profileUser.worksAt}</span>
        </span>
      </div>
      <button className="button logout" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  )
}

export default InfoCard
