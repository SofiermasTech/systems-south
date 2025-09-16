<template>
  <div class="main-about-us">
    <AboutUsHero />
    <TeamBlock />
    <AboutUsOffer />
    <div class="main-about-us__line">
      <div class="main-about-us__line-inner container"></div>
    </div>
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
import AboutUsOffer from '@/pages/about-us/ui/AboutUsOffer.vue'
import AboutUsDelivery from '@/pages/about-us/ui/AboutUsDelivery.vue'
import AboutUsReviews from '@/pages/about-us/ui/AboutUsReviews.vue'
import CallbackSection from '@/widgets/callback-section/CallbackSection.vue'

export default {
  name: 'AboutUsPage',
  components: {
    AboutUsHero,
    TeamBlock,
    AboutUsOffer,
    AboutUsDelivery,
    AboutUsReviews,
    CallbackSection,
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.main-about-us {
  background-color: var(--blue-0);

  &__line {
    background-color: var(--white);
  }

  &__line-inner {
    height: clamp(8px, 1vw, 20px);
    background-color: var(--blue-0);

    &.container {
      max-width: var(--container-width);

      @include mobile {
        margin-inline: auto;
        max-width: 90%;
      }
    }
  }

  &__wrapper {
    padding-top: var(--section-offset);
    background-color: var(--white);
  }
}
</style>
