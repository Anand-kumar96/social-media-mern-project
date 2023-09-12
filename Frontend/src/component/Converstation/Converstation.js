import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'

const Converstation = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null) // user to whom i wanna chat => to show on right side
  
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId)
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId)
        setUserData(data.user)
      } catch (err) {
        console.log(err)
      }
    }
    getUserData()
  }, [])
 
  return (
    <>
      <div className="follower conversation">
        <div>
          <div className={online ? 'online-dot' : ''}></div>
          <img
            src={
              userData?.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                : process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'
            }
            className="followerImage"
            alt=""
          />
          <div className="name" style={{ fontSize: '0.8rem' }}>
            <span>{`${userData?.firstname} ${userData?.lastname}`}</span>
            <span>{online ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: '90%', border: '1px solid #rgb(21 20 20 / 26)' }} />
    </>
  )
}

export default Converstation

/// userData ?.profilePicture
//or userData ?userData.profilePicture
// both are same i think you got it
