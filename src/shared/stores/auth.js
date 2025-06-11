import { defineStore } from 'pinia';
import api from '@/api';
import { useOrderStore } from './order';
import { useCartStore } from './cart';
import { useFavoritesStore } from './favorites';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token && state.isAuthenticated,
    getUser: (state) => state.user,
    getError: (state) => state.error,
  },

  actions: {
    initializeAuth() {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        this.fetchUser();
      }
    },

    async fetchUser() {
      try {
        const response = await api.get('/user');
        this.user = response.data;
        const orderStore = useOrderStore();
        const cartStore = useCartStore();
        const favoritesStore = useFavoritesStore();
        cartStore.setNewUser(false); // Существующий пользователь
        await cartStore.loadCart();
        await cartStore.mergeAnonymousCart();
        await Promise.all([
          orderStore.fetchOrders(),
          favoritesStore.fetchFavorites(),
        ]);
      } catch (error) {
        console.error('Ошибка загрузки пользователя:', error);
        this.logout();
      }
    },

    async register(formData) {
      try {
        this.error = null;
        const response = await api.post('/register', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          checkbox: formData.checkbox,
        });
        this.token = response.data.token;
        this.user = response.data.user;
        this.isAuthenticated = true;
        localStorage.setItem('authToken', this.token);
        const orderStore = useOrderStore();
        const cartStore = useCartStore();
        const favoritesStore = useFavoritesStore();
        cartStore.setNewUser(true); // Новый пользователь
        await cartStore.loadCart();
        await cartStore.mergeAnonymousCart();
        await Promise.all([
          orderStore.fetchOrders(),
          favoritesStore.fetchFavorites(),
        ]);
      } catch (error) {
        this.error = error.response?.data?.message || 'Ошибка при регистрации';
        throw error;
      }
    },

    async login(formData) {
      try {
        this.error = null;
        const response = await api.post('/login', {
          email: formData.email,
          password: formData.password,
        });
        this.token = response.data.token;
        this.user = response.data.user;
        this.isAuthenticated = true;
        localStorage.setItem('authToken', this.token);
        const orderStore = useOrderStore();
        const cartStore = useCartStore();
        const favoritesStore = useFavoritesStore();
        cartStore.setNewUser(false); // Существующий пользователь
        await cartStore.loadCart();
        await cartStore.mergeAnonymousCart();
        await Promise.all([
          orderStore.fetchOrders(),
          favoritesStore.fetchFavorites(),
        ]);
      } catch (error) {
        this.error = error.response?.data?.message || 'Ошибка при входе';
        throw error;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.error = null;
      localStorage.removeItem('authToken');
      const orderStore = useOrderStore();
      const cartStore = useCartStore();
      const favoritesStore = useFavoritesStore();
      orderStore.orders = [];
      cartStore.clearCart();
      favoritesStore.favorites = [];
    },

    clearError() {
      this.error = null;
    },
  },
});
