import axios from 'axios'

const API = axios.create({
  baseURL: 'https://social-media-app-ckll.onrender.com',
})
export const userChats = (id) => {
  return API.get(`/chat/${id}`)
}
export const createChat = (data) => {
  return API.post(`/chat`, data)
}

