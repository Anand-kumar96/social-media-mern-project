// to work with we set proxy in package.json =>
const axios = require('axios')

const API = axios.create({
  baseURL: 'https://social-media-app-ckll.onrender.com',
})
export const logIn = (formData) => API.post('/auth/login', formData)
export const signUp = (formData) => API.post('/auth/register', formData)
