import { Modal, useMantineTheme } from '@mantine/core'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { uploadImage } from '../actions/uploadAction'
import { updateUser } from '../actions/UserAction'

function ProfileModal({ modalOpen, setModalOpen, data }) {
  const theme = useMantineTheme()
  const { password, ...other } = data
  const [formData, setFormData] = useState(other)
  const [coverImage, setCoverImage] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const dispatch = useDispatch()
  const param = useParams()

  const handleFormChange = (e) => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value }) // it will  do every input
  }
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
  
        e.target.name === 'profileImage'
          ? setProfileImage(img)
          : setCoverImage(img)
      }
  }

  // for submission
  const handleSubmit =(e) =>{
    e.preventDefault();
    let userData = formData;
      if (profileImage) {
        // storing image in mongodb is not a good idea so we store in server
        const data = new FormData()
        const filename = Date.now() + profileImage.name
        data.append('name', filename)
        data.append('file', profileImage)
        userData.profilePicture = filename
        try {
          dispatch(uploadImage(data))
        } catch (err) {
          console.log(err)
        }
      }
       if (coverImage) {
         const data = new FormData()
         const filename = Date.now() + coverImage.name
         data.append('name', filename)
         data.append('file', coverImage)
         userData.coverPicture = filename
         try {
           dispatch(uploadImage(data))
         } catch (err) {
           console.log(err)
         }
       }
       dispatch(updateUser(param.id,userData)) // newPost is main post
      //  resetUpload() // after uploading desc and image clear
       setModalOpen(false)
  }
  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="40%"
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>
        <div>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name"
            className="infoInput"
            onChange={handleFormChange}
            value={formData.firstname}
          />
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
            className="infoInput"
            onChange={handleFormChange}
            value={formData.lastname}
          />
        </div>
        <div>
          <input
            type="text"
            name="worksAt"
            id="worksAt"
            placeholder="Works at"
            className="infoInput"
            onChange={handleFormChange}
            value={formData.worksAt}
          />
        </div>
        <div>
          <input
            type="text"
            name="livesIn"
            id="livesIn"
            placeholder="Lives in"
            className="infoInput"
            onChange={handleFormChange}
            value={formData.livesIn}
          />
          <input
            type="text"
            name="country"
            id="country"
            placeholder="Country"
            className="infoInput"
            onChange={handleFormChange}
            value={formData.country}
          />
        </div>
        <div>
          <input
            type="text"
            name="relationShip"
            id="relationShip"
            placeholder="RelationShip status"
            className="infoInput"
            onChange={handleFormChange}
            value={formData.relationShip}
          />
        </div>
        <div>
          Profile image
          <input type="file" name="profileImage" onChange={handleImageChange} />
          Cover image
          <input type="file" name="coverImage" onChange={handleImageChange} />
        </div>
        <button
          className="button infoButton"
          onClick={handleSubmit}
          type="submit"
        >
          Update
        </button>
      </form>
    </Modal>
  )
}

export default ProfileModal
