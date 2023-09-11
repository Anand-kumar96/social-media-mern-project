const axios = require('axios')

const API = axios.create({ baseURL: 'https://social-chat-app.onrender.com' })
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }
  // console.log(req)
  return req
})

export const getUser = (id) => API.get(`/user/${id}`)
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData)
export const getAllUser = () => API.get('/user')
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data)
export const unFollowUser = (id, data) => API.put(`/user/${id}/unFollow`, data)
