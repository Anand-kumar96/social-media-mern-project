const axios = require('axios')

const API = axios.create({ baseURL: 'https://social-chat-app.onrender.com' })
export const getMessages = (id)=>API.get(`/message/${id}`)
export const addMessage = (data)=>API.post(`/message/`,data)