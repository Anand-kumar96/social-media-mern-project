const initialState = false
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'Show-Profile':
      return !state
    default:
      return initialState
  }
}
export default profileReducer
