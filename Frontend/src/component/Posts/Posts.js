import React, { useEffect, useState } from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getTimeLinePosts } from '../../actions/postAction'
import { useParams } from 'react-router-dom'
import { getAllUser } from '../../api/UserRequest'
const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  const [userDetails, setUserDetails] = useState()

  useEffect(() => {
    dispatch(getTimeLinePosts(user._id))
  }, [])

   useEffect(() => {
     const fetchAllUser = async () => {
       const { data } = await getAllUser()
       if(data){
        setUserDetails(data)
       }
     }
     fetchAllUser()
   }, [])

  let { posts, loading } = useSelector((state) => state.postReducer)
 if(!posts) return (<div className="posts">"No posts..!!"</div>)
 if(params.id) posts = posts.filter((post)=>post.userId === params.id)
  return (
    <div className="posts">
      {loading ? (
        'fetching posts...'
      ) : posts?.length !== 0 ? (
        posts.map((post, index) => (
          <Post
            key={index}
            data={post}
            id={index}
            userInfo={userDetails?.users?.find((e) => e._id === post.userId)}
          />
        ))
      ) : (
        <div className="no-post">No posts found ......</div>
      )}
    </div>
  )
}

export default Posts
