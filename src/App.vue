<template>
  <HeaderApp />
  <main class="main">
    <router-view />
  </main>
  <FooterApp />
</template>

<script>
import HeaderApp from '@/components/HeaderApp.vue'
import FooterApp from '@/components/FooterApp.vue'
export default {
  components: {
    HeaderApp,
    FooterApp,
  },
}
</script>

<style lang="scss"></style>
