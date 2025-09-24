import axios from 'axios'
import { useAuthStore } from '@/shared/stores/auth.js'

const baseURL = '/api';
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (
      token &&
      !config.url.includes('/token') && !config.url.includes('/client/restore-password') && !config.url.includes('/products')
    ) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('Adding Authorization header:', config.headers.Authorization)
    } else {
      console.log('No authToken or skipped for:', config.url)
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
  async (error) => {
    const originalConfig = error.config
    console.error('API response error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    })

    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true
      const authStore = useAuthStore()
      try {
        await authStore.refreshToken()
        return api(originalConfig)
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError)
        authStore.logout()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
