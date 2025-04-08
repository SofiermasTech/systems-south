<template>
  <HeaderApp />
  <main class="main">
    <router-view :products="products" />
  </main>
  <FooterApp />
</template>

<script>
import HeaderApp from '@/components/HeaderApp.vue'
import FooterApp from '@/components/FooterApp.vue'
import products from '@/assets/data/catalog.json';

export default {
  components: {
    HeaderApp,
    FooterApp,
  },
  data() {
    return {
      products,
    };
  },
}
</script>

<style lang="scss"></style>
