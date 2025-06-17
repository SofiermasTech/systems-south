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
        const response = await api.get('/user')
        this.user = response.data
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
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          checkbox: formData.checkbox,
        })
        this.token = response.data.token
        this.user = response.data.user
        this.isAuthenticated = true
        localStorage.setItem('authToken', this.token)
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
        throw error
      }
    },

    async login(formData) {
      try {
        this.error = null
        const response = await api.post('/login', {
          email: formData.email,
          password: formData.password,
        })
        this.token = response.data.token
        this.user = response.data.user
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

    async fetchUsers() {
      try {
        const response = await api.get('/users')
        return response.data
      } catch (error) {
        console.error('Ошибка загрузки списка пользователей:', error)
        throw error
      }
    },

    async updatePassword({ currentPassword, newPassword }) {
      try {
        const response = await api.put(`/users/${this.user.id}/password`, {
          currentPassword,
          newPassword,
        })
        this.user = { ...this.user, password: newPassword }
        localStorage.setItem('authUser', JSON.stringify(this.user))
        return response.data
      } catch (error) {
        console.error('Ошибка при изменении пароля:', error)
        throw error
      }
    },
  },
})
