import axios from "axios"

// for django
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
})

// apiClient.interceptors.request.use((config) => {

// })

const { get, post, put, patch, delete: destroy } = apiClient
export { get, post, put, patch, destroy }
