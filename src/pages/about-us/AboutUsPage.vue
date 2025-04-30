<template>
  <div class="main-about-us">
    <AboutUsHero />
    <TeamBlock />
    <AboutUsDelivery />
    <AboutUsReviews />
  </div>
</template>

<script>
import AboutUsHero from '@/pages/about-us/ui/AboutUsHero.vue'
import TeamBlock from '@/pages/about-us/ui/TeamBlock.vue'
import AboutUsDelivery from '@/pages/about-us/ui/AboutUsDelivery.vue'
import AboutUsReviews from '@/pages/about-us/ui/AboutUsReviews.vue'

export default {
  name: 'AboutUsPage',
  components: {
    AboutUsHero,
    TeamBlock,
    AboutUsDelivery,
    AboutUsReviews,
  },
}
</script>

<style lang="scss">
.main-about-us {
  background-color: var(--blue-0);
}
</style>
