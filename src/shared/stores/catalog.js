import { defineStore } from 'pinia'
import productsData from '@/assets/data/catalog.json'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    products: [],
  }),
  actions: {
    async loadProducts() {
      this.isLoading = true
      try {
        this.products = productsData
      } finally {
        this.isLoading = false
      }
    },
  },
  getters: {
    getProducts(state) {
      return state.products
    },
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id)
    },
    // Уникальные категории
    getCategories(state) {
      return [...new Set(state.products.map((product) => product.category))]
    },
    getSubcategoriesByCategory: (state) => (category) => {
      return [
        ...new Set(
          state.products
            .filter((product) => product.category === category)
            .map((product) => product.subcategory)
            .filter((subcategory) => subcategory), // Исключаем undefined или пустые значения
        ),
      ]
    },
    // Товары по категории
    getProductsByCategory: (state) => (category) => {
      return state.products.filter((product) => product.category === category)
    },
    // Товары по категории и подкатегории
    getProductsByCategoryAndSubcategory: (state) => (category, subcategory) => {
      return state.products.filter(
        (product) => product.category === category && product.subcategory === subcategory,
      )
    },
  },
})
