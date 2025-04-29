import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  getters: {
    cartItemsCount(state) {
      // Суммируем quantity всех товаров в корзине
      return state.cartItems.reduce((total, item) => total + item.quantity, 0)
    },
  },
  actions: {
    loadCart() {
      // Загружаем данные из localStorage
      const savedCartItems = localStorage.getItem('cartItems')
      if (savedCartItems) {
        try {
          // Парсим данные и проверяем, что это массив
          const parsedItems = JSON.parse(savedCartItems)
          if (Array.isArray(parsedItems)) {
            this.cartItems = parsedItems
          } else {
            console.warn('Данные корзины в localStorage некорректны. Сбрасываем корзину.')
            this.cartItems = []
            this.saveCart()
          }
        } catch (error) {
          console.error('Ошибка при загрузке корзины из localStorage:', error)
          this.cartItems = []
          this.saveCart()
        }
      }
    },
    saveCart() {
      // Сохраняем корзину в localStorage
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },
    addToCart(product, quantity = 1) {
      // Проверяем, есть ли товар в корзине
      const existingItem = this.cartItems.find((item) => item.id === product.id)
      if (existingItem) {
        // Если товар уже есть, увеличиваем его количество
        existingItem.quantity += quantity
      } else {
        // Если товара нет, добавляем новый объект
        this.cartItems.push({ id: product.id, quantity })
      }
      // Сохраняем корзину после изменений
      this.saveCart()
    },
    clearCart() {
      // Очищаем корзину
      this.cartItems = []
      this.saveCart()
    },
  },
})
