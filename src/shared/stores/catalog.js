import { defineStore } from 'pinia';
import productsData from '@/assets/data/catalog.json';

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    products: [],
  }),
  actions: {
    loadProducts() {
      this.products = productsData;
    },
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },
  },
});
