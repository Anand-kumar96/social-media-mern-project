import React, { useEffect, useState } from 'react'
import './LogoSearch.css'
import Comment from '../img/comment.png'
import Logo from '../img/logo.png'
import profileLogo from '../img/profile.png'
import crossLogo from '../img/Cross.png'
import { UilSearch } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../api/UserRequest'
import { Link } from 'react-router-dom'
import { showUserProfile } from '../actions/showUserProfile'

const LogoSearch = () => {
  const [allUser, setAllUser] = useState([])
  const [input, setInput] = useState()
  const [filterUser, setFilterUser] = useState([])
  const { user } = useSelector((state) => state.authReducer.authData)
  const showProfile = useSelector((state) => state.profileReducer)
  const dispatch = useDispatch()
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const { data } = await getAllUser()
        setAllUser(data.users.filter((e) => e._id !== user._id))
      } catch (err) {
        console.log(err)
      }
    }
    fetchAllUser()
  }, [input])
  const handleChange = (e) => {
    setInput(e.target.value)
    const filtered = allUser?.filter((user) =>
      user?.firstname.toLowerCase().includes(input?.toLowerCase())
    )
    setFilterUser(filtered)
  }

  return (
    <>
      <div className="logoSearch">
        <div
          className="profile-logo"
          onClick={() => {
            dispatch(showUserProfile())
          }}
        >
          {!showProfile && <img src={profileLogo} alt="profile logo" />}
          {showProfile && (
            <img
              src={crossLogo}
              alt="profile logo"
            />
          )}
        </div>
        <Link to={'../home'} className="searchLogo">
          <img src={Logo} alt="search logo" />
        </Link>
        <div className="search">
          <input
            type="text"
            placeholder="#Explore"
            onChange={handleChange}
            value={input}
          />
          <div className="s-icon">
            <UilSearch />
          </div>
        </div>
        <Link to={'../chat'} className="messageIcon">
          <img src={Comment} alt="" />
        </Link>
      </div>
      <div className="users-search">
        {input &&
          filterUser.map((user, index) => (
            <Link
              to={`/userPage/${user._id}`}
              style={{ textDecoration: 'none' }}
              key={index}
            >
              <div className="follower all-users all-users-responsive">
                <div>
                  <img
                    src={
                      user.profilePicture
                        ? serverPublic + user.profilePicture
                        : serverPublic + 'defaultProfile.png'
                    }
                    alt="follower"
                    className="followerImg"
                  />
                  <div className="name">
                    <span>{user.firstname}</span>
                    <span>{user.username}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  )
}

export default LogoSearch
