import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../actions/UserAction'
import { useState } from 'react'
const User = ({ person, index }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const dispatch = useDispatch()
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  )
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user))
    setFollowing((prev) => !prev)
  }
  return (
    <div className="follower" key={index}>
      <div>
        <img
          src={
            person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + 'defaultProfile.png'
          }
          alt="follower"
          className="followerImg"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? 'button fc-button unfollowButton' : 'button fc-button '
        }
        onClick={handleFollow}
      >
        {following ? 'following' : 'follow'}
      </button>
    </div>
  )
}

export default User
