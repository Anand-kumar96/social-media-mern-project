import React, { useEffect, useState } from 'react'
import './FollowersCard.css'
import User from './user/User'
import {useSelector} from 'react-redux'
import { getAllUser } from '../api/UserRequest'
const FollowersCard = () => {
   const {user} = useSelector((state) => state.authReducer.authData)
   const [persons, setPersons] = useState([])
   const[show,setShow] = useState(false)
   const handleShow = ()=>{
    setShow((prev)=>!prev)
   }
   useEffect(() => {
     const fetchAllUser = async () => {
       const { data } = await getAllUser()
       const users = data.users.filter((eachUser) => eachUser._id !== user._id)
       setPersons(users)
     }
     fetchAllUser()
   }, [user])
  return (
    <div className="followersCard">
      <h3>People you may know</h3>
      {show
        ? persons.map((person, index) => (
            <User person={person} key={index} />
          ))
        : persons
            .slice(0, 4)
            .map((person, index) => (
              <User person={person} key={index}/>
            ))}
      <h3 onClick={handleShow} style={{ cursor: 'pointer' }}>
        {show ? 'show less' : 'show more'}
      </h3>
    </div>
  )
}

export default FollowersCard