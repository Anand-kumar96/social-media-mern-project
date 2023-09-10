import * as UserApi from '../api/UserRequest'
import { successNotification } from '../utils/notification'
export const updateUser = (id, formData) => async(dispatch)=> {
 dispatch({ type: 'UPDATE_START' })
 try {
   const {data} = await UserApi.updateUser(id,formData)
   successNotification('your profile is successfully updated')
   dispatch({ type: 'UPDATE_SUCCESS', data: data })
 } catch (error) {
   console.log(error)
   dispatch({ type: 'UPDATE_FAIL' })
 }
}

export const followUser = (id,data)=>async(dispatch)=>{
  dispatch({ type: 'FOLLOW_USER',data:id })
  await UserApi.followUser(id,data)
  }
export const unFollowUser = (id,data)=>async(dispatch)=>{
  dispatch({ type: 'UNFOLLOW_USER',data:id })
  await UserApi.unFollowUser(id,data)
  }
