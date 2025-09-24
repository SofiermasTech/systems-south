import { defineStore } from 'pinia'
import productsData from '@/assets/data/catalog.json'
import api from '@/api' // Импорт API для запросов

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    products: [],
    categories: [], // Добавляем отдельное состояние для категорий
    isLoading: false, // Добавляем в state для глобального лоадинга
  }),
  actions: {
    async loadProducts() {
      this.isLoading = true
      try {
        const response = await api.get('api/products')
        this.products = Array.isArray(response.data.products) ? response.data.products : []
        console.log(response.data.products)
        if (this.products.length === 0) {
          console.warn('Server returned empty products, using mock data')
          this.products = productsData
        }
      } catch (error) {
        console.error('Ошибка загрузки продуктов:', error)
        this.products = productsData // Fallback на мок-данные
      } finally {
        this.isLoading = false
      }
    },

    async loadCategories() {
      this.isLoading = true
      try {
        const response = await api.get('api/categories')
        console.log('[CatalogStore] Categories loaded:', response.data)
        this.categories = Array.isArray(response.data) ? response.data : []
        if (this.categories.length === 0) {
          console.warn('Server returned empty categories, using mock data')
          this.categories = [...new Set(productsData.map((product) => product.category))]
        }
      } catch (error) {
        console.error('[CatalogStore] Ошибка загрузки категорий:', error)
        // Fallback на локальные категории из products
        this.categories = [...new Set(productsData.map((product) => product.category))]
      } finally {
        this.isLoading = false
      }
    },
  },
  getters: {
    getProducts(state) {
      console.log(state.products)
      return state.products
    },
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id)
    },
    // Уникальные категории
    getCategories(state) {
      console.log(state.categories)
      return state.categories
      // .length > 0
     //   // ? state.categories
      //   : [...new Set(state.products.map((product) => product.category))]
    },

    getSubcategoriesByCategory: (state) => (category) => {
      return [
        ...new Set(
          state.products
            .filter((product) => product.category === category)
            .map((product) => product.subcategory)
            .filter((subcategory) => subcategory),
        ),
      ]
    },
    // Товары по категории
    getProductsByCategory: (state) => (category) => {
      return state.products.filter((product) => product.categoryId === category)
    },
    // Товары по категории и подкатегории
    getProductsByCategoryAndSubcategory: (state) => (category, subcategory) => {
      return state.products.filter(
        (product) => product.categoryId === category && product.subcategory === subcategory,
      )
    },
  },
})
