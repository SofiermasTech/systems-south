import { defineStore } from 'pinia';
import api from '@/api';
import { useAuthStore } from './auth';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
    anonymousCart: [],
    isNewUser: false, // Флаг для нового пользователя
  }),
  getters: {
    cartItemsCount(state) {
      return Array.isArray(state.cartItems) ? state.cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
    },
  },
  actions: {
    setNewUser(isNew) {
      this.isNewUser = isNew;
    },
    loadCart() {
      const authStore = useAuthStore();
      if (authStore.isLoggedIn) {
        this.cartItems = [];
        if (!this.isNewUser) {
          // Не загружать корзину с сервера для новых пользователей
          this.fetchCart();
        }
      } else {
        const savedCart = localStorage.getItem('anonymousCart');
        if (savedCart) {
          try {
            const parsedItems = JSON.parse(savedCart);
            if (Array.isArray(parsedItems)) {
              this.anonymousCart = parsedItems;
              this.cartItems = parsedItems;
              console.log('Loaded anonymousCart:', parsedItems);
            } else {
              console.warn('Invalid cart data. Resetting.');
              this.anonymousCart = [];
              this.cartItems = [];
              this.saveAnonymousCart();
            }
          } catch (error) {
            console.error('Error loading anonymousCart:', error);
            this.anonymousCart = [];
            this.cartItems = [];
            this.saveAnonymousCart();
          }
        }
      }
    },
    saveAnonymousCart() {
      localStorage.setItem('anonymousCart', JSON.stringify(this.anonymousCart));
      console.log('Saved anonymousCart:', this.anonymousCart);
    },
    async fetchCart() {
      const authStore = useAuthStore();
      if (!authStore.isLoggedIn) return;
      try {
        const response = await api.get(`/cart/${authStore.getUser.id}`);
        console.log('Cart response:', response.data);
        this.cartItems = Array.isArray(response.data) ? response.data : [];
        console.log('cartItems after fetchCart:', this.cartItems);
      } catch (error) {
        console.error('Error fetching cart:', error);
        this.cartItems = [];
      }
    },
    async syncCart() {
      const authStore = useAuthStore();
      if (!authStore.isLoggedIn) return;
      try {
        console.log('Syncing cart:', this.cartItems);
        await api.post(`/cart/${authStore.getUser.id}`, this.cartItems);
      } catch (error) {
        console.error('Error syncing cart:', error);
        throw error;
      }
    },
    addToCart(product, quantity = 1) {
      const authStore = useAuthStore();
      const targetCart = authStore.isLoggedIn ? this.cartItems : this.anonymousCart;
      const existingItem = targetCart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        targetCart.push({ id: product.id, quantity });
      }
      if (authStore.isLoggedIn) {
        this.cartItems = targetCart;
        this.syncCart();
      } else {
        this.cartItems = targetCart;
        this.saveAnonymousCart();
      }
    },
    clearCart() {
      const authStore = useAuthStore();
      if (authStore.isLoggedIn) {
        this.cartItems = [];
        this.syncCart();
      } else {
        this.anonymousCart = [];
        this.cartItems = [];
        this.saveAnonymousCart();
      }
    },
    async mergeAnonymousCart() {
      const authStore = useAuthStore();
      if (!authStore.isLoggedIn || !this.anonymousCart.length) {
        console.log('mergeAnonymousCart skipped:', {
          isLoggedIn: authStore.isLoggedIn,
          anonymousCart: this.anonymousCart,
        });
        return;
      }
      console.log('Merging anonymousCart:', this.anonymousCart, 'with cartItems:', this.cartItems);
      const mergedCart = [...this.cartItems];
      for (const anonItem of this.anonymousCart) {
        const existingItem = mergedCart.find((item) => item.id === anonItem.id);
        if (existingItem) {
          existingItem.quantity += anonItem.quantity;
        } else {
          mergedCart.push({ ...anonItem });
        }
      }
      this.cartItems = mergedCart;
      this.anonymousCart = [];
      this.saveAnonymousCart();
      await this.syncCart();
      console.log('mergeAnonymousCart completed:', this.cartItems);
    },
    persistCart() {
      const authStore = useAuthStore();
      if (authStore.isLoggedIn) {
        this.syncCart();
      } else {
        this.saveAnonymousCart();
      }
    },
  },
});
