import * as PostApi from '../api/postRequest'
// login action
export const getTimeLinePosts = (id) => async (dispatch) => {
  dispatch({ type: 'RETREIVING_START' })
  try {
    const {data}  = await PostApi.getTimeLinePosts(id)
    dispatch({ type: 'RETREIVING_SUCCESS', data: data.posts })
  } catch (err) {
    console.log(err)
    dispatch({ type: 'RETREIVING_FAIL' })
  }
}
