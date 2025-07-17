import { defineStore } from 'pinia'
import api from '@/api'
import { useOrderStore } from './order'
import { useCartStore } from './cart'
import { useFavoritesStore } from './favorites'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token && state.isAuthenticated,
    getUser: (state) => state.user,
    getError: (state) => state.error,
  },

  actions: {
    initializeAuth() {
      const token = localStorage.getItem('authToken')
      const user = localStorage.getItem('authUser')
      if (token && user) {
        try {
          this.token = token
          this.user = JSON.parse(user)
          this.isAuthenticated = true

          this.fetchUser().catch((error) => {
            console.error('Failed to fetch user during initialization:', error)
          })
        } catch (error) {
          console.error('Error parsing authUser from localStorage:', error)
          this.logout()
        }
      }
    },

    async fetchUser() {
      try {
        console.log('[authStore] Fetching user with token:', localStorage.getItem('authToken'))
        const response = await api.get('/api/client')
        console.log('[authStore] Fetch user response:', response.data)
        this.user = {
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phone,
        }
        console.log('[authStore] User updated:', this.user)
        localStorage.setItem('authUser', JSON.stringify(this.user))
        const orderStore = useOrderStore()
        const cartStore = useCartStore()
        const favoritesStore = useFavoritesStore()
        cartStore.setNewUser(false)
        await cartStore.loadCart()
        await cartStore.mergeAnonymousCart()
        await Promise.all([orderStore.fetchOrders(), favoritesStore.fetchFavorites()])
      } catch (error) {
        console.error('Ошибка загрузки пользователя:', error)
        throw error
      }
    },

    async register(formData) {
      try {
        this.error = null
        const response = await api.post('/register', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          // checkbox: formData.checkbox,
        })
        console.log('[authStore] Registration response:', response.data)
        this.token = response.data.token
        localStorage.setItem('refreshToken', response.data.refresh_token)

        this.user = {
          id: response.data.user.id,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          phone: response.data.user.phone,
        }
        // localStorage.setItem('authUser', JSON.stringify(this.user))
        console.log('[authStore] User set:', this.user)

        this.isAuthenticated = true
        localStorage.setItem('authToken', this.token)
        // this.user = response.data.user

        // await this.fetchUser()
        localStorage.setItem('authUser', JSON.stringify(this.user))

        const orderStore = useOrderStore()
        const cartStore = useCartStore()
        const favoritesStore = useFavoritesStore()
        cartStore.setNewUser(true)
        await cartStore.loadCart()
        await cartStore.mergeAnonymousCart()
        await Promise.all([orderStore.fetchOrders(), favoritesStore.fetchFavorites()])
      } catch (error) {
        this.error = error.response?.data?.message || 'Ошибка при регистрации'
        console.error('Registration error:', error)
        throw error
      }
    },

    async login(formData) {
      try {
        this.error = null
        console.log('[authStore] Sending login data:', formData)
        const response = await api.post('/token', {
          email: formData.email,
          password: formData.password,
        })
        console.log('[authStore] Login response:', response.data)
        this.token = response.data.token
        localStorage.setItem('refreshToken', response.data.refresh_token)

        // this.user = response.data.user
        this.user = {
          id: response.data.user.id,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          phone: response.data.user.phone,
        }
        console.log('[authStore] User set:', this.user)
        this.isAuthenticated = true
        localStorage.setItem('authToken', this.token)
        localStorage.setItem('authUser', JSON.stringify(this.user))
        const orderStore = useOrderStore()
        const cartStore = useCartStore()
        const favoritesStore = useFavoritesStore()
        cartStore.setNewUser(false)
        await cartStore.loadCart()
        await cartStore.mergeAnonymousCart()
        await Promise.all([orderStore.fetchOrders(), favoritesStore.fetchFavorites()])
      } catch (error) {
        this.error = error.response?.data?.message || 'Ошибка при входе'
        console.error('Login error:', error)
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      this.error = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')
      const orderStore = useOrderStore()
      const cartStore = useCartStore()
      const favoritesStore = useFavoritesStore()
      orderStore.orders = []
      cartStore.clearCart()
      favoritesStore.favorites = []
    },

    clearError() {
      this.error = null
    },

    // async fetchUsers() {
    //   try {
    //     const response = await api.get('/api/client')
    //     return response.data
    //   } catch (error) {
    //     console.error('Ошибка загрузки списка пользователей:', error)
    //     throw error
    //   }
    // },

    async updatePassword({ oldPassword, newPassword }) {
      try {
        console.log('[authStore] Sending password update:', { oldPassword, newPassword })
        const response = await api.patch('/client/change-password', {
          oldPassword,
          newPassword,
        })
        console.log('[authStore] Password update response:', response.data)
        // this.user = { ...this.user, password: newPassword }
        // localStorage.setItem('authUser', JSON.stringify(this.user))
        return response.data
      } catch (error) {
        console.error('Ошибка при изменении пароля:', error)
        throw error
      }
    },
  },

  // Отправка ссылки для подтверждения email
  async sendConfirmationLink(newEmail = null) {
    try {
      const response = await api.post('/api/client/send-confirmation-link', {
        newEmail,
      })
      return response.data
    } catch (error) {
      this.error = error.response?.data?.message || 'Ошибка при отправке ссылки'
      throw error
    }
  },

  // Подтверждение email
  async confirmEmail(uuid) {
    try {
      const response = await api.post('/api/client/email-confirmation', {
        uuid,
      })
      await this.fetchUser() // Обновляем данные пользователя после подтверждения
      return response.data
    } catch (error) {
      this.error = error.response?.data?.message || 'Ошибка при подтверждении email'
      throw error
    }
  },

  // Запрос на восстановление пароля
  async restorePassword(email) {
    try {
      const response = await api.post('/api/client/restore-password', {
        email,
      })
      return response.data
    } catch (error) {
      this.error = error.response?.data?.message || 'Ошибка при запросе восстановления пароля'
      throw error
    }
  },

  // Установка нового пароля
  async setNewPassword({ uuid, password }) {
    try {
      const response = await api.patch('/api/client/set-new-password', {
        uuid,
        password,
      })
      return response.data
    } catch (error) {
      this.error = error.response?.data?.message || 'Ошибка при установке нового пароля'
      throw error
    }
  },

  // Обновление данных пользователя
  async updateUser(data) {
    try {
      const response = await api.patch('/api/client', data)
      this.user = { ...this.user, ...response.data }
      localStorage.setItem('authUser', JSON.stringify(this.user))
      return response.data
    } catch (error) {
      this.error = error.response?.data?.message || 'Ошибка при обновлении данных'
      throw error
    }
  },

  // Обновление токена
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        throw new Error('Отсутствует refresh_token')
      }
      const response = await api.post('/token/refresh', {
        refresh_token: refreshToken,
      })
      this.token = response.data.token
      localStorage.setItem('authToken', this.token)
      localStorage.setItem('refreshToken', response.data.refresh_token)
      return response.data
    } catch (error) {
      this.error = error.response?.data?.message || 'Ошибка при обновлении токена'
      throw error
    }
  },
})
