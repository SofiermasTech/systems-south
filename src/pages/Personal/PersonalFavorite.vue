<template>
  <section class="favorites-page">
    <BaseTitleEmptyPage
      v-if="favorites.length === 0"
      :title="'В избранном нет добавленных позиций'"
      :subtitle="'Перейдите в каталог, чтобы добавить товары в избранное'"
    />
    <div v-else class="favorites-page__list">
      <ProductCard
        v-for="product in favorites"
        :key="product.id"
        :product-id="product.id"
        @toggle-favorite="handleToggleFavorite"
      />
    </div>
  </section>
</template>

<script>
import ProductCard from '@/entities/product/ProductCard.vue'
import { useFavoritesStore } from '@/shared/stores/favorites.js'
import { useAuthStore } from '@/shared/stores/auth.js'
import BaseTitleEmptyPage from '@/shared/ui/BaseTitleEmptyPage.vue'

export default {
  name: 'FavoritesPage',
  components: {
    ProductCard,
    BaseTitleEmptyPage,
  },
  data() {
    return {
      favoritesStore: null,
    }
  },
  created() {
    this.favoritesStore = useFavoritesStore()
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) {
      this.$router.push({ name: 'Login' })
    }
  },
  computed: {
    favorites() {
      return this.favoritesStore.favorites
    },
  },
  methods: {
    handleToggleFavorite(product) {
      const message = this.favoritesStore.isFavorite(product.id)
        ? 'добавлен в избранное'
        : 'удалён из избранного'
      console.log(`Товар ${product.name} ${message}`)
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
