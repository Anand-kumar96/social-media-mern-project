const initialState = {
  posts: [],
  loading: false,
  error: false,
  uploading: false,
}
const postReducer = (state = initialState, action) => {
  // belongs to PostShare.js
  switch (action.type) {
    case 'UPLOAD_START':
      return { ...state, uploading: true }
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
      }
    case 'UPLOAD_FAIL':
      return { ...state, error: true }
    // belongs to Posts.js
    case 'RETREIVING_START':
      return { ...state, loading: true, error: false }
    case 'RETREIVING_SUCCESS':
      return { ...state, posts: action.data, loading: false, error: false }
    case 'RETREIVING_FAIL':
      return { ...state, loading: false, error: true }
    default:
      return state
  }
}
export default postReducer
