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
  name: 'TeamBlock',
  components: {
    BreadcrumbsList,
  },
}
</script>
<style lang="scss">
.about-us {
  height: 85vh;
  max-height: 1000px;
  padding: 50px 40px;
  padding-bottom: clamp(40px, 12vh, 120px);
  background-image: url('@/assets/images/about-us-back.jpg');
  background-position: center;
  background-size: cover;

  .breadcrumb__item {
    color: var(--white);
  }

  .breadcrumb__item:not(:last-child) a,
  .breadcrumb__item:not(:last-child) a::after {
    color: var(--blue-100) !important;
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
  }

  &__title {
    font-weight: 500;
    font-size: 60px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--white);
  }

  &__text {
    max-width: 55%;
    font-weight: 500;
    font-size: 16px;
    color: var(--white);
    align-self: flex-end;
  }
}
</style>
