import * as UploadApi from '../api/UploadRequest'
import { successNotification } from '../utils/notification'
//uploadImage
export const uploadImage = (data) => async (dispatch) => {
  try {
    await UploadApi.uploadImage(data)
  } catch (error) {
    console.log(error)
  }
}
//upload post
export const uploadPost = (data) => async (dispatch) => {
    dispatch({type:'UPLOAD_START'})
  try {
   const post = await UploadApi.uploadPost(data)
   successNotification('post posted successfully !!')
   dispatch({type:'UPLOAD_SUCCESS',data:post.data.newPost})
} catch (error) {
    console.log(error)
    dispatch({type:'UPLOAD_FAIL'})
  }
}
