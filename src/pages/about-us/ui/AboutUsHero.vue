<template>
  <section class="about-us">
    <div class="about-us__body container">
      <BreadcrumbsList />
      <div class="about-us__content">
        <h1 class="about-us__title">Какой-то заголовок</h1>
        <p class="about-us__text">
          Вы можете оформить заказ на нашем сайте, добавив товары в корзину и следуя инструкциям по
          оформлению. Также вы можете связаться с нами по телефону или электронной почте для
          консультации и оформления заказа.Вы можете оформить заказ на нашем сайте, добавив товары в
          корзину и следуя инструкциям по оформлению.
        </p>
      </div>
    </div>
  </section>
</template>
<script>
import BreadcrumbsList from '@widgets/intro-pages/BreadcrumbsList.vue'
export default {
  name: 'AboutUsHero',
  components: {
    BreadcrumbsList,
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/utils.scss';

.about-us {
  height: 85vh;
  max-height: 1080px;
  padding-top: 50px;
  padding-bottom: clamp(40px, 12vh, 120px);
  background-image: url('@/assets/images/about-us-back.jpg');
  background-position: top;
  background-size: cover;

  @include tablet {
    height: 60vh;
  }

  &__body {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__content {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__title {
    font-weight: 500;
    @include fluid-text(64, 24);
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--white);
  }

  &__text {
    max-width: 55%;
    font-weight: 500;
    @include fluid-text(16, 10);
    color: var(--white);
    align-self: flex-end;

    @include tablet-bottom {
      max-width: 80%;
    }
  }
}
</style>

<style lang="scss">
.about-us {
  .breadcrumb__item {
    color: var(--white);
  }

  .breadcrumb__item:not(:last-child) a,
  .breadcrumb__item:not(:last-child) a::after {
    color: var(--blue-100) !important;
  }
}
</style>
