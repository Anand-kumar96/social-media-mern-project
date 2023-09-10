import React from 'react'
import './PostShare.css'
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from '@iconscout/react-unicons'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, uploadPost } from '../../actions/uploadAction'

const PostShare = ({ setModalOpen }) => {
  const loading = useSelector((state) => state.postReducer.uploading)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  const [image, setImage] = useState(null)
  const desc = useRef()
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      setImage(img)
    }
  }

  const imageRef = useRef()

  const handleShare = (e) => {
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    }
    if (image) {
      // storing image in mongodb is not a good idea so we store in server
      const data = new FormData()
      const filename = Date.now() + image.name
      data.append('name', filename)
      data.append('file', image)
      newPost.image = filename
      try {
          if (desc.current.value !== '' || image) {
            dispatch(uploadImage(data))
            // console.log('image uploaded')
          }
      } catch (err) {
        console.log(err)
      }
    }
   if ( desc.current.value !== '' || image) {
     dispatch(uploadPost(newPost)) // newPost is main post
      // console.log('post uploaded')
   }
    resetUpload() // after uploading desc and image clear
    setModalOpen && setModalOpen(false)
  }
  const resetUpload = () => {
    setImage(null)
    desc.current.value = ''
  }
  return (
    <div className="postShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + 'defaultProfile.png'
        }
        alt="Profile_Pic"
      />
      <div>
        <input
          ref={desc}
          type="text"
          placeholder="What's happening..."
          required
        />
        <div className="postOptions">
          <div className="option" onClick={() => imageRef.current.click()}>
            <UilScenery />
            Photo
          </div>
          <div className="option">
            <UilPlayCircle />
            Video
          </div>
          <div className="option">
            <UilLocationPoint />
            Location
          </div>
          <div className="option">
            <UilSchedule />
            Schedule
          </div>
          <button
            className="button ps"
            onClick={handleShare}
            disabled={loading}
          >
            {loading ? 'uploading...' : 'Share'}
          </button>
          <div style={{ display: 'none' }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes
              onClick={() => setImage(null)}
              style={{
                backgroundColor: 'rgba(241, 140, 140, 0.756)',
                padding: '0.2rem 0.4rem',
                borderRadius: '2px',
              }}
            />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostShare

/*
createObjectURL=> create url form image
imageRef.current.click()=>current property
*/
