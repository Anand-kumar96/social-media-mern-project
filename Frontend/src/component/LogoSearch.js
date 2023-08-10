import React, { useEffect, useState } from 'react'
import './LogoSearch.css'
import Logo from '../img/logo.png'
import { UilSearch } from '@iconscout/react-unicons'
import { useSelector } from 'react-redux'
import { getAllUser } from '../api/UserRequest'
import { Link } from 'react-router-dom'
const LogoSearch = () => {
  const [allUser, setAllUser] = useState([])
  const [input, setInput] = useState()
  const [filterUser, setFilterUser] = useState([])
  const { user } = useSelector((state) => state.authReducer.authData)
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
        <img src={Logo} alt="search logo" />
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
      </div>
      <div className="users-search">
        {input &&
          filterUser.map((user, index) => (
            <Link
              to={`/userPage/${user._id}`}
              style={{ textDecoration: 'none' }}
              key={index}
            >
              <div className="follower all-users">
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
