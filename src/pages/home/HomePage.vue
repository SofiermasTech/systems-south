<template>
  <HomeHero />
  <ProductSection
    :title="newProductsTitle"
    filter-type="new"
    @toggle-favorite="handleToggleFavorite"
    style="margin-bottom: 16px"
  />
  <ProductSection
    :title="bestOffersTitle"
    filter-type="best"
    @toggle-favorite="handleToggleFavorite"
  />
  <HomeWorkWithUs />
  <HomeAboutUs />
</template>

<script>
import HomeHero from '@/pages/home/ui/HomeHero.vue'
import ProductSection from '@widgets/product-section/ProductSection.vue'
import HomeWorkWithUs from '@/pages/home/ui/HomeWorkWithUs.vue'
import HomeAboutUs from '@/pages/home/ui/HomeAboutUs.vue'
import { useFavoritesStore } from '@/shared/stores/favorites'

export default {
  name: 'HomePage',
  components: {
    HomeHero,
    ProductSection,
    HomeWorkWithUs,
    HomeAboutUs,
  },
  data() {
    return {
      newProductsTitle: 'Новые товары',
      bestOffersTitle: 'Лучшие предложения',
      catalogStore: null,
      favoritesStore: null,
    }
  },
  created() {
    this.favoritesStore = useFavoritesStore()
  },
  methods: {
    handleToggleFavorite(product) {
      const message = this.favoritesStore.isFavorite(product.id)
        ? 'Товар добавлен в избранное'
        : 'Товар удалён из избранного'
      console.log(`Товар ${product.name} ${message}`)
    },
  },
}
</script>
<style lang="scss"></style>
