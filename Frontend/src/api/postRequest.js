// to work with we set proxy in package.json =>
const axios = require('axios')

const API = axios.create({
  baseURL: 'https://social-media-app-ckll.onrender.com',
})
export const getTimeLinePosts = (id) => API.get(`/post/${id}/timelinePosts`)
export const likePost = (id, userId) =>
  API.put(`/post/${id}/like`, { userId: userId })
