const axios = require('axios')

const API = axios.create({
  baseURL: 'https://social-media-app-ckll.onrender.com',
})
export const uploadImage = (data) => API.post('/upload', data)
export const uploadPost = (data) => API.post('/post', data)
