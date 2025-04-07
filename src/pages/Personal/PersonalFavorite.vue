<template>
  <div class="favorites-page">
    <div v-if="favorites.length === 0" class="favorites-page__empty">
      <p class="favorites-page__empty-title">В избранном нет добавленных позиций</p>
      <span class="favorites-page__empty-text"
        >Перейдите в каталог, чтобы добавить товары в избранное</span
      >
    </div>
    <div v-else class="favorites-page__list">
      <ProductCard
        v-for="product in favorites"
        :key="product.id"
        :product="product"
        @toggle-favorite="handleToggleFavorite"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/common/ProductCard.vue'
import { useFavoritesStore } from '@/stores/favorites.js'

export default {
  name: 'FavoritesPage',
  components: {
    ProductCard,
  },
  data() {
    return {
      favoritesStore: null,
    }
  },
  created() {
    this.favoritesStore = useFavoritesStore()
  },
  computed: {
    favorites() {
      return this.favoritesStore ? this.favoritesStore.favorites : []
    },
  },
  methods: {
    handleToggleFavorite(product) {
      console.log(`Товар ${product.name} удалён из избранного`)
    },
  },
}
</script>

<style scoped lang="scss">
.favorites-page {
  &__empty {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__empty-title {
    font-weight: 500;
    font-size: 48px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__empty-text {
    font-weight: 500;
    font-size: 16px;
    color: var(--grey-200);
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
}
</style>
