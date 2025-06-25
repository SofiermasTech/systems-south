import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('Adding Authorization header:', config.headers.Authorization)
    } else {
      console.log('No authToken found in localStorage')
    }
    return config
  },
  (error) => {
    console.error('Interceptor error:', error)
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API response error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    })
    return Promise.reject(error)
  },
)

export default api
