import { defineStore } from 'pinia'
import { useAuthStore } from './auth.js'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [], // Массив избранных товаров
  }),
  getters: {
    // Проверяем, есть ли товар в избранном
    isFavorite: (state) => (productId) => {
      return state.favorites.some((product) => product.id === productId)
    },
    // Количество избранных товаров (для счётчика в хедере)
    favoritesCount: (state) => {
      return state.favorites.length
    },
  },
  actions: {
    loadFavorites() {
      const authStore = useAuthStore()
      if (authStore.isLoggedIn) {
        const savedFavorites = localStorage.getItem('favorites')
        if (savedFavorites) {
          const allFavorites = JSON.parse(savedFavorites)
          this.favorites = allFavorites[`user_${authStore.getUser.id}`] || []
        }
      }
      if (!authStore.isLoggedIn) {
        this.favorites = []
      }
    },
    // Добавляем товар в избранное
    addToFavorites(product) {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) {
        throw new Error('Авторизуйтесь для добавления в избранное')
      }
      if (!this.isFavorite(product.id)) {
        this.favorites.push(product)
        const allFavorites = JSON.parse(localStorage.getItem('favorites') || '{}')
        allFavorites[`user_${authStore.getUser.id}`] = this.favorites
        localStorage.setItem('favorites', JSON.stringify(allFavorites))
      }
    },
    // Удаляем товар из избранного
    removeFromFavorites(productId) {
      this.favorites = this.favorites.filter((product) => product.id !== productId)
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    // Переключаем состояние избранного
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
