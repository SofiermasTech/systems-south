import { defineStore } from 'pinia'
import api from '@/api'
import { useAuthStore } from './auth.js'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
    isLoading: false,
    error: null,
  }),
  getters: {
    getOrders: (state) => state.orders,
    hasOrders: (state) => state.orders.length > 0,
    isOrdersLoading: (state) => state.isLoading,
    getOrderError: (state) => state.error,
  },

  actions: {
    async createOrder(orderData) {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) {
        this.error = 'Авторизуйтесь для оформления заказа'
        throw new Error(this.error)
      }

      try {
        this.isLoading = true
        this.error = null

        // Генерируем уникальный номер заказа
        const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 100)}`

        const order = {
          userId: authStore.getUser.id,
          orderNumber,
          items: orderData.items, // [{ id, name, article, quantity, price }]
          totalAmount: orderData.totalAmount,
          orderDate: new Date().toISOString(),
        }

        const response = await api.post('/orders', order)
        this.orders.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Ошибка при создании заказа'
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async fetchOrders() {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) {
        this.orders = []
        return
      }

      try {
        this.isLoading = true
        this.error = null
        const response = await api.get('/orders', {
          params: { userId: authStore.getUser.id },
        })
        this.orders = response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Ошибка при загрузке заказов'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    clearError() {
      this.error = null
    },
  },
})
