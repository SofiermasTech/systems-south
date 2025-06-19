<template>
  <section class="hero container">
    <div class="hero__body">
      <BaseCardTopSale :data="popularProduct" theme="hero" />
      <PromoWidget />
      <RouterLink to="/about-us" class="hero__block hero__block--about">
        <div class="hero__block-content">
          <h2 class="hero__block-title">О нас</h2>
          <div class="hero__block-bottom">
            <div class="hero__block-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut
            </div>
            <div class="hero__block-arrow">
              <BaseIcon name="ArrowUpRightIcon" />
            </div>
          </div>
        </div>
        <div class="hero__block-bottom-img">
          <img src="@/assets/images/hero-block-1.png" alt="" width="273" height="276" />
        </div>
      </RouterLink>
      <div class="hero__block hero__block--delivery">
        <div class="hero__block-content">
          <h2 class="hero__block-title">Доставка и оплата</h2>
          <div class="hero__block-bottom">
            <div class="hero__block-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut
            </div>
            <div class="hero__block-arrow">
              <BaseIcon name="ArrowUpRightIcon" />
            </div>
          </div>
        </div>
        <div class="hero__block-bottom-img">
          <img src="@/assets/images/hero-block-1.png" alt="" width="273" height="276" />
        </div>
      </div>
      <RouterLink to="/contacts" class="hero__block hero__block--contacts">
        <div class="hero__block-content">
          <h2 class="hero__block-title">Контакты</h2>
          <div class="hero__block-bottom">
            <div class="hero__block-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut
            </div>
            <div class="hero__block-arrow">
              <BaseIcon name="ArrowUpRightIcon" />
            </div>
          </div>
        </div>
        <div class="hero__block-bottom-img">
          <img src="@/assets/images/hero-block-1.png" alt="" width="273" height="276" />
        </div>
      </RouterLink>
      <RouterLink to="/faq" class="hero__block hero__block--faq">
        <div class="hero__block-content">
          <h2 class="hero__block-title">FAQ</h2>
          <div class="hero__block-bottom">
            <div class="hero__block-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut
            </div>
            <div class="hero__block-arrow">
              <BaseIcon name="ArrowUpRightIcon" />
            </div>
          </div>
        </div>
        <div class="hero__block-bottom-img">
          <img src="@/assets/images/hero-block-1.png" alt="" width="273" height="276" />
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script>
import BaseCardTopSale from '@/shared/ui/BaseCardTopSale.vue'
import PromoWidget from '@/widgets/promo-widget/PromoWidget.vue'

export default {
  components: {
    BaseCardTopSale,
    PromoWidget,
  },
  data() {
    return {
      popularProduct: [
        {
          productId: 11,
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.hero {
  margin-top: 12px;
  margin-bottom: var(--section-offset);
  max-height: 870px;

  &__body {
    width: 100%;
    max-height: 90vh;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, minmax(300px, 400px));
    grid-template-rows: 1fr 350px;
    gap: 8px;
  }

  &__block {
    width: 100%;
    height: 100%;
    padding: 24px;
    background-color: var(--blue-0);
    border-radius: var(--br-block);
    text-decoration: none;
    color: inherit;
    position: relative;
  }

  &__block--delivery,
  &__block--contacts,
  &__block--faq,
  &__block--about {
    overflow: hidden;

    .hero__block-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .hero__block-title {
      font-weight: 500;
      font-size: 32px;
      line-height: 110%;
      letter-spacing: -0.04em;
      color: var(--blue);
    }

    .hero__block-bottom {
      display: flex;
      gap: 16px;
      position: relative;
      z-index: 3;
    }

    .hero__block-text {
      font-size: 14px;
    }

    .hero__block-arrow {
      flex-shrink: 0;
      border: 1px solid var(--blue-0);
      border-radius: 50%;
      width: 70px;
      height: 70px;
      background-color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 10px;
        height: 10px;
        color: var(--blue);
      }
    }

    .hero__block-bottom-img {
      position: absolute;
      bottom: 0;
      left: 0;

      img {
        object-fit: contain;
        transform: translateY(100%);
        transition: 0.5s;
      }
    }

    &:hover {
      .hero__block-bottom-img img {
        transform: translateY(0);
        transition: 0.5s;
      }
    }
  }
}
.container {
}
</style>
