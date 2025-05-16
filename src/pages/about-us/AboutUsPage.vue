<template>
  <div class="main-about-us">
    <AboutUsHero />
    <TeamBlock />
    <AboutUsDelivery />
    <AboutUsReviews />
    <div class="main-about-us__wrapper">
      <CallbackSection />
    </div>
  </div>
</template>

<script>
import AboutUsHero from '@/pages/about-us/ui/AboutUsHero.vue'
import TeamBlock from '@/pages/about-us/ui/TeamBlock.vue'
import AboutUsDelivery from '@/pages/about-us/ui/AboutUsDelivery.vue'
import AboutUsReviews from '@/pages/about-us/ui/AboutUsReviews.vue'
import CallbackSection from '@/widgets/callbackSection/CallbackSection.vue'


export default {
  name: 'AboutUsPage',
  components: {
    AboutUsHero,
    TeamBlock,
    AboutUsDelivery,
    AboutUsReviews,
    CallbackSection,
  },
}
</script>

<style lang="scss">
.main-about-us {
  background-color: var(--blue-0);

  &__wrapper {
    padding-top: var(--section-offset);
    background-color: var(--white);
  }
}
</style>
