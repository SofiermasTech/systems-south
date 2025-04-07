<template>
  <HomeHero />
  <ProductSection
    :title="newProductsTitle"
    :products="newProducts"
    @toggle-favorite="handleToggleFavorite"
    style="margin-bottom: 16px"
  />
  <ProductSection
    :title="bestOffersTitle"
    :products="bestOffers"
    @toggle-favorite="handleToggleFavorite"
  />
</template>

<script>
import HomeHero from '@/components/HomePage/HomeHero.vue'
import ProductSection from '@/components/ProductSection.vue'
import products from '@/assets/data/catalog.json'
// import { mapStores } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'

export default {
  name: 'HomePage',
  components: {
    HomeHero,
    ProductSection,
  },
  data() {
    return {
      newProductsTitle: 'Новые товары',
      bestOffersTitle: 'Лучшие предложения',
      allProducts: products,
      favoritesStore: null,
    }
  },
  created() {
    this.favoritesStore = useFavoritesStore()
  },
  computed: {
    newProducts() {
      // Фильтруем товары, где new: true
      return this.allProducts.filter((product) => product.new)
    },
    bestOffers() {
      // Фильтруем товары, где best: true
      return this.allProducts.filter((product) => product.best)
    },
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
