const axios = require('axios')
const API = axios.create({ baseURL: 'https://social-chat-app.onrender.com' })
export const uploadImage = (data) => API.post('/upload', data)
export const uploadPost = (data) => API.post('/post', data)
