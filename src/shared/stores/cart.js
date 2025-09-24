import { defineStore } from 'pinia'
import api from '@/api'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
    anonymousCart: [],
    isNewUser: false,
  }),
  getters: {
    cartItemsCount(state) {
      return Array.isArray(state.cartItems)
        ? state.cartItems.reduce((total, item) => total + item.quantity, 0)
        : 0
    },
  },
  actions: {
    setNewUser(isNew) {
      this.isNewUser = isNew
    },

    async loadCart() {
      const authStore = useAuthStore()
      if (authStore.isLoggedIn) {
        this.cartItems = []
        if (!this.isNewUser) {
          await this.fetchCart()
        }
      } else {
        const savedCart = localStorage.getItem('anonymousCart')
        if (savedCart) {
          try {
            const parsedItems = JSON.parse(savedCart)
            if (Array.isArray(parsedItems)) {
              this.anonymousCart = parsedItems
              this.cartItems = parsedItems
              console.log('Loaded anonymousCart:', parsedItems)
            } else {
              console.warn('Invalid cart data. Resetting.')
              this.anonymousCart = []
              this.cartItems = []
              this.saveAnonymousCart()
            }
          } catch (error) {
            console.error('Error loading anonymousCart:', error)
            this.anonymousCart = []
            this.cartItems = []
            this.saveAnonymousCart()
          }
        }
      }
    },

    saveAnonymousCart() {
      localStorage.setItem('anonymousCart', JSON.stringify(this.anonymousCart))
      console.log('Saved anonymousCart:', this.anonymousCart)
    },

    async fetchCart() {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) return
      try {
        const response = await api.get('api/cart')
        console.log('Cart response:', response.data)
        this.cartItems = Array.isArray(response.data)
          ? response.data.map((item) => ({ id: item.id, quantity: item.quantity }))
          : []
        console.log('cartItems after fetchCart:', this.cartItems)
      } catch (error) {
        console.error('Error fetching cart:', error)
        this.cartItems = []
      }
    },

    // async syncCart() {
    //   const authStore = useAuthStore()
    //   if (!authStore.isLoggedIn) return
    //   try {
    //     console.log('Syncing cart:', this.cartItems)
    //     await api.post(`/cart/${authStore.getUser.id}`, this.cartItems)
    //   } catch (error) {
    //     console.error('Error syncing cart:', error)
    //     throw error
    //   }
    // },

    async addToCart(productId, quantity = 1) {
      const authStore = useAuthStore()
      const targetCart = authStore.isLoggedIn ? this.cartItems : this.anonymousCart
      const existingItem = targetCart.find((item) => item.id === productId)
      console.log({ productId, quantity })
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        targetCart.push({ productId, quantity })
      }
      if (authStore.isLoggedIn) {
        this.cartItems = targetCart

        try {
          await api.post('api/cart', { productId, quantity })
          await this.fetchCart()
        } catch (error) {
          console.error('Error adding to cart:', error)
          throw error
        }
      } else {
        this.cartItems = targetCart
        this.saveAnonymousCart()
      }
    },

    async clearCart() {
      const authStore = useAuthStore()
      if (authStore.isLoggedIn) {
        this.cartItems = []

        try {
          await api.delete('api/cart')
          await this.fetchCart()
        } catch (error) {
          console.error('Error clearing cart:', error)
          throw error
        }
      } else {
        this.anonymousCart = []
        this.cartItems = []
        this.saveAnonymousCart()
      }
    },
    async mergeAnonymousCart() {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn || !this.anonymousCart.length) {
        console.log('mergeAnonymousCart skipped:', {
          isLoggedIn: authStore.isLoggedIn,
          anonymousCart: this.anonymousCart,
        })
        return
      }
      console.log('Merging anonymousCart:', this.anonymousCart, 'with cartItems:', this.cartItems)
      for (const anonItem of this.anonymousCart) {
        await this.addToCart(anonItem.id, anonItem.quantity)
      }
      this.anonymousCart = []
      this.saveAnonymousCart()
      await this.fetchCart()
      console.log('mergeAnonymousCart completed:', this.cartItems)
    },

    // persistCart() {
    //   const authStore = useAuthStore()
    //   if (authStore.isLoggedIn) {
    //     this.syncCart()
    //   } else {
    //     this.saveAnonymousCart()
    //   }
    // },
  },
})
