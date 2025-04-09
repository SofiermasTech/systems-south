import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: [], // Массив избранных товаров
  }),
  getters: {
    // Проверяем, есть ли товар в избранном
    isFavorite: (state) => (productId) => {
      return state.favorites.some((product) => product.id === productId);
    },
    // Количество избранных товаров (для счётчика в хедере)
    favoritesCount: (state) => {
      return state.favorites.length;
    },
  },
  actions: {
    // Загружаем избранное из localStorage при инициализации
    loadFavorites() {
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        this.favorites = JSON.parse(savedFavorites);
      }
    },
    // Добавляем товар в избранное
    addToFavorites(product) {
      if (!this.isFavorite(product.id)) {
        this.favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
      }
    },
    // Удаляем товар из избранного
    removeFromFavorites(productId) {
      this.favorites = this.favorites.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },
});
