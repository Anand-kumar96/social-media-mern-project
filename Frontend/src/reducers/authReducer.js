const initialState = { authData: null, loading: false, error: false }
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // for login
    case 'AUTH_START':
      return { ...state, loading: true, error: false }
    case 'AUTH_SUCCESS':
      localStorage.setItem('profile', JSON.stringify({ ...action?.data })) // storing in local storage
      return { ...state, authData: action.data, loading: false, error: false }
    case 'AUTH_FAIL':
      return { ...state, loading: false, error: true }

    // update user
    case 'UPDATE_START':
      return { ...state, loading: true, error: false }
    case 'UPDATE_SUCCESS':
      localStorage.setItem('profile', JSON.stringify({ ...action?.data })) // storing in local storage
      return { ...state, authData: action.data, loading: false, error: false }
    case 'UPDATE_FAIL':
      return { ...state, loading: false, error: true }

    // for logout
    case 'LOG_OUT':
      localStorage.clear()
      return { ...state, authData: null, loading: false, error: false }

    //follow
    case 'FOLLOW_USER':
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data],
          },
        },
      }
    case 'UNFOLLOW_USER':
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (personId) => personId !== action.data
              ),
            ],
          },
        },
      }
    default:
      return state
  }
}
export default authReducer
