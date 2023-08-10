import * as UploadApi from '../api/UploadRequest'
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
   dispatch({type:'UPLOAD_SUCCESS',data:post.data.newPost})
} catch (error) {
    console.log(error)
    dispatch({type:'UPLOAD_FAIL'})
  }
}
