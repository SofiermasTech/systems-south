import { defineStore } from 'pinia'
import promoData from '@/assets/data/promo.json'

export const usePromoStore = defineStore('promo', {
  state: () => ({
    promo: [],
    filter: 'all',
  }),
  actions: {
    loadPromo() {
      this.promo = promoData
    },
    setFilter(filter) {
      this.filter = filter
    },
  },
  getters: {
    getPromo(state) {
      const today = new Date()
      if (state.filter === 'all') {
        return state.promo.filter((item) => new Date(item.date) >= today)
      }
      if (state.filter === 'new') {
        const twoDaysAgo = new Date()
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
        return state.promo.filter(
          (item) => new Date(item.publication) >= twoDaysAgo && new Date(item.date) >= today,
        )
      }
      if (state.filter === 'soon') {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        return state.promo.filter(
          (item) => new Date(item.date) >= today && new Date(item.date) <= tomorrow,
        )
      }
      return state.promo
    },
    getPromoCount: (state) => (filter) => {
      const today = new Date()
      if (filter === 'all') {
        return state.promo.filter((item) => new Date(item.date) >= today).length
      }
      if (filter === 'new') {
        const twoDaysAgo = new Date()
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 7)
        return state.promo.filter(
          (item) => new Date(item.publication) >= twoDaysAgo && new Date(item.date) >= today,
        ).length
      }
      if (filter === 'soon') {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 7)
        return state.promo.filter(
          (item) => new Date(item.date) >= today && new Date(item.date) <= tomorrow,
        ).length
      }
      return 0
    },
    getPromoArchive(state) {
      const today = new Date()
      return state.promo.filter((item) => new Date(item.date) < today)
    },
    getPromoById: (state) => (id) => {
      return state.promo.find((item) => item.id === id)
    },
  },
})
