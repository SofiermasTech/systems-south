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
        const response = await api.get('api/favourite-product')
        console.log('Favorites response:', response.data)
        this.favorites = Array.isArray(response.data) ? response.data : []
      } catch (error) {
        console.error('Ошибка загрузки избранного:', error)
        this.favorites = []
      }
    },

    // async syncFavorites() {
    //   const authStore = useAuthStore()
    //   if (!authStore.isLoggedIn) return
    //   try {
    //     await api.post(`/favorites/${authStore.getUser.id}`, this.favorites)
    //   } catch (error) {
    //     console.error('Ошибка синхронизации избранного:', error)
    //   }
    // },

    async addToFavorites(productId) {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) {
        throw new Error('Авторизуйтесь для добавления в избранное')
      }
      if (!this.isFavorite(productId)) {
        try {
          await api.post('api/favourite-product', { productId })
          await this.fetchFavorites()
        } catch (error) {
          console.error('Ошибка добавления в избранное:', error)
          throw new Error('Не удалось добавить в избранное')
        }
      }
    },

    async removeFromFavorites(productId) {
      try {
        await api.delete('api/favourite-product', { data: { productId } })
        await this.fetchFavorites()
      } catch (error) {
        console.error('Ошибка удаления из избранного:', error)
        throw new Error('Не удалось удалить из избранного')
      }
    },

    async toggleFavorite(productId) {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) {
        throw new Error('Авторизуйтесь для добавления в избранное')
      }
      if (this.isFavorite(productId)) {
        await this.removeFromFavorites(productId)
      } else {
        await this.addToFavorites(productId)
      }
    },
  },
})
