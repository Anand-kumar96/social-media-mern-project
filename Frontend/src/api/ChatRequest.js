import axios from 'axios'
const API = axios.create({baseURL: 'http://localhost:5000'});

export const userChats = (id) => {
  return API.get(`/chat/${id}`)
}
