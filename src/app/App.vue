<template>
  <HeaderApp />
  <main class="main">
    <router-view />
  </main>
  <FooterApp />
</template>

<script>
import HeaderApp from '@/widgets/header/HeaderBlock.vue'
import FooterApp from '@/widgets/footer/FooterBlock.vue'

export default {
  components: {
    HeaderApp,
    FooterApp,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss"></style>
