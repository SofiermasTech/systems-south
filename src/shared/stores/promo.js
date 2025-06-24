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
        const filteredPromo = state.promo.filter((item) => new Date(item.date) >= today)
        return filteredPromo.sort((a, b) => new Date(a.date) - new Date(b.date))
      }
      if (state.filter === 'new') {
        const twoDaysAgo = new Date()
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 7)
        const filteredPromo = state.promo.filter(
          (item) => new Date(item.publication) >= twoDaysAgo && new Date(item.date) >= today,
        )
        return filteredPromo.sort((a, b) => new Date(a.date) - new Date(b.date))
      }
      if (state.filter === 'soon') {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 7)
        const filteredPromo = state.promo.filter(
          (item) => new Date(item.date) >= today && new Date(item.date) <= tomorrow,
        )
        return filteredPromo.sort((a, b) => new Date(a.date) - new Date(b.date))
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
      const filteredPromo = state.promo.filter((item) => new Date(item.date) < today)
      return filteredPromo.sort((a, b) => new Date(b.date) - new Date(a.date))
    },
    getPromoById: (state) => (id) => {
      return state.promo.find((item) => item.id === id)
    },
  },
})
