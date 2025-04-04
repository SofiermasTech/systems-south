<template>
  <HomeHero />
  <ProductSection :title="newProductsTitle" :products="newProducts" style="margin-bottom: 16px;"/>
  <ProductSection :title="bestOffersTitle" :products="bestOffers"/>
</template>

<script>
import HomeHero from '@/components/HomePage/HomeHero.vue'
import ProductSection from '@/components/ProductSection.vue'
import products from "@/assets/data/catalog.json";

export default {
  name: 'HomePage',
  components: {
    HomeHero,
    ProductSection,
  },
  data() {
    return {
      newProductsTitle: "Новые товары",
      bestOffersTitle: "Лучшие предложения",
      allProducts: products,
    };
  },
  computed: {
    newProducts() {
      // Фильтруем товары, где new: true
      return this.allProducts.filter((product) => product.new);
    },
    bestOffers() {
      // Фильтруем товары, где best: true
      return this.allProducts.filter((product) => product.best);
    },
  },
}
</script>
<style lang="scss"></style>
