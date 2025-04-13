<template>
  <button type="button" class="favorite-button" :class="{ 'favorite-page': isProductPage }" @click.stop="toggleFavorite">
    <svg v-if="!isInFavorites" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
      <path
        stroke="#242527"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M13.914 1.5c-1.704 0-3.174.998-3.914 2.453C9.261 2.498 7.79 1.5 6.087 1.5c-2.442 0-4.42 2.047-4.42 4.567s1.514 4.83 3.471 6.728C7.095 14.693 10 16.5 10 16.5s2.812-1.777 4.863-3.705c2.187-2.055 3.47-4.2 3.47-6.728 0-2.527-1.978-4.567-4.42-4.567Z"
      />
    </svg>
    <svg
      v-else
      class="like-active"
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="#1C71B7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9127 0.5C11.2093 0.5 9.73852 1.4975 8.99935 2.9525C8.26018 1.4975 6.78935 0.5 5.08602 0.5C2.64435 0.5 0.666016 2.5475 0.666016 5.0675C0.666016 7.5875 2.18018 9.8975 4.13685 11.795C6.09352 13.6925 8.99935 15.5 8.99935 15.5C8.99935 15.5 11.811 13.7225 13.8618 11.795C16.0493 9.74 17.3327 7.595 17.3327 5.0675C17.3327 2.54 15.3543 0.5 12.9127 0.5Z"
        fill="#1C71B7"
      />
    </svg>
  </button>
</template>

<script>
import { useFavoritesStore } from '@/shared/stores/favorites'

export default {
  name: 'FavoriteButton',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isInFavorites() {
      const favoritesStore = useFavoritesStore()
      return favoritesStore.isFavorite(this.product.id)
    },
    isProductPage() {
      return this.$route.path.startsWith('/product/');
    },
  },
  methods: {
    toggleFavorite() {
      const favoritesStore = useFavoritesStore()
      favoritesStore.toggleFavorite(this.product)
    },
  },
}
</script>

<style lang="scss">
.favorite-button {
  border: 1px solid var(--grey-100);
  background-color: transparent;
  border-radius: 50%;
  padding: 12px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 18px;
  }

  &.favorite-page {
    border: none;
    width: 20px;
    height: 20px;
    padding: 0;
  }

  .like-active {
    color: var(--blue);
  }
}
</style>
