import { defineStore } from 'pinia'
import api from '@/api'
import { useAuthStore } from './auth.js'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [],
  }),
  getters: {
    isFavorite: (state) => (productId) => {
      return (
        Array.isArray(state.favorites) &&
        state.favorites.some((product) => product.id === productId)
      )
    },
    favoritesCount: (state) => {
      return Array.isArray(state.favorites) ? state.favorites.length : 0
    },
  },
  actions: {
    async fetchFavorites() {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) {
        this.favorites = []
        return
      }
      try {
        const response = await api.get(`/favorites/${authStore.getUser.id}`)
        console.log('Favorites response:', response.data) // Логирование
        this.favorites = Array.isArray(response.data) ? response.data : []
      } catch (error) {
        console.error('Ошибка загрузки избранного:', error)
        this.favorites = []
      }
    },
    async syncFavorites() {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) return
      try {
        await api.post(`/favorites/${authStore.getUser.id}`, this.favorites)
      } catch (error) {
        console.error('Ошибка синхронизации избранного:', error)
      }
    },
    addToFavorites(product) {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) {
        throw new Error('Авторизуйтесь для добавления в избранное')
      }
      if (!this.isFavorite(product.id)) {
        this.favorites.push(product)
        this.syncFavorites()
      }
    },
    removeFromFavorites(productId) {
      this.favorites = this.favorites.filter((product) => product.id !== productId)
      this.syncFavorites()
    },
    toggleFavorite(product) {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) {
        throw new Error('Авторизуйтесь для добавления в избранное')
      }
      if (this.isFavorite(product.id)) {
        this.removeFromFavorites(product.id)
      } else {
        this.addToFavorites(product)
      }
    },
  },
})
