//thunk function
import * as AuthApi from '../api/AuthRequest'
import { errorNotification, successNotification } from '../utils/notification'
// login action
export const logIn = (formData) => async(dispatch)=>{
    dispatch({type: 'AUTH_START'})
    try {
        const { data } = await AuthApi.logIn(formData)
         successNotification('login successful!!','x')
        dispatch({type: 'AUTH_SUCCESS', data: data})
    } catch(err) {
        errorNotification(err?.response?.data?.message, err)
        dispatch({type: 'AUTH_FAIL'})
}
}

// signUp action
export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' })
  try {
    const { data } = await AuthApi.signUp(formData)
    successNotification('Signup successful!! 🫠','x')
    dispatch({ type: 'AUTH_SUCCESS', data: data })
  } catch (err) {
    errorNotification(err?.response?.data?.message, err)
    dispatch({ type: 'AUTH_FAIL' })
  }
}

// logout
export const logOut = () => async(dispatch)=>{
    successNotification('logout successful!!')
    dispatch({type: 'LOG_OUT'})
}