import React, { useEffect, useState } from 'react'
import './ProfileCard.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getUser } from '../api/UserRequest'
import { logOut } from '../actions/AuthAction'
const ProfileCard = ({ location, show }) => {
  const params = useParams()
  const { user } = useSelector((state) => state.authReducer.authData)
  const { posts } = useSelector((state) => state.postReducer)
  const [searchUser, setSearchUser] = useState()
  const dispatch = useDispatch()
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  useEffect(() => {
    const getSearchUser = async () => {
      try {
        if (params.id) {
          const { data } = await getUser(params.id)
          setSearchUser(data.user)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getSearchUser()
  }, [])

  const handleLogOut = () => {
    dispatch(logOut()) // while dispatching call the function
  }

  return (
    <div className="profileCard">
      <div className={`profileImage ${location ? 'coverHeight' : ''}`}>
        <img
          src={
            searchUser
              ? searchUser.coverPicture
                ? serverPublic + searchUser.coverPicture
                : serverPublic + 'defaultCover.jpg'
              : user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + 'defaultCover.jpg'
          }
          alt="CoverImage"
        />
        <img
          src={
            searchUser
              ? searchUser.profilePicture
                ? serverPublic + searchUser.profilePicture
                : serverPublic + 'defaultProfile.png'
              : user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + 'defaultProfile.png'
          }
          alt="ProfileImage"
        />
      </div>
      <div className="profileName">
        {searchUser ? (
          <span>{`${searchUser.firstname} ${searchUser.lastname}`}</span>
        ) : (
          <span>{`${user.firstname} ${user.lastname}`}</span>
        )}
        {searchUser ? (
          <span>{searchUser.worksAt && searchUser.worksAt}</span>
        ) : (
          <span>{user.worksAt ? user.worksAt : 'Write about yourself'}</span>
        )}
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            {searchUser ? (
              <span>{searchUser.following.length}</span>
            ) : (
              <span>{user.following.length}</span>
            )}
            <span>Following</span>
          </div>
          <div className="vertical"></div>
          <div className="follow">
            {searchUser ? (
              <span>{searchUser.followers.length}</span>
            ) : (
              <span>{user.followers.length}</span>
            )}
            <span>Followers</span>
          </div>
          {location === 'profilePage' && (
            <>
              <div className="vertical"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {!show ? (
        location === 'profilePage' ? (
          ' '
        ) : (
          <>
            <span>
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                to={`/profile/${user._id}`}
              >
                My Profile
              </Link>
            </span>
            <span className="responsive-logout" onClick={handleLogOut}>
              Log out
            </span>
          </>
        )
      ) : (
        ''
      )}
    </div>
  )
}

export default ProfileCard
