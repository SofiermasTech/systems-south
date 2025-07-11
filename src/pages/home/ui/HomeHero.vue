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
      <a href="#" class="hero__block hero__block--delivery">
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
      </a>
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
@import '@/assets/styles/utils.scss';

.hero {
  margin-top: 12px;
  margin-bottom: var(--section-offset);

  @media screen and (max-width: 720px) {
    margin-top: 0;
  }

  &__body {
    width: 100%;
    // max-height: 92vh;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, minmax(173px, 422px));
    grid-template-rows: clamp(350px, 28vw, 530px) clamp(220px, 21vw, 380px);
    gap: 8px;

    @include tablet {
      gap: 6px;
    }

    @media screen and (max-width: 992px) {
      grid-template-rows: min(290px, 38vw) minmax(130px, 16vw) min(175px, 28vw);
    }

    @media screen and (max-width: 720px) {
      max-height: fit-content;
      grid-template-columns: repeat(2, minmax(173px, 422px));
      grid-template-rows: auto;
    }

    @media screen and (max-width: 560px) {
      max-height: fit-content;
      display: flex;
      flex-direction: column;
    }
  }

  &__block {
    width: 100%;
    height: 100%;
    padding: clamp(12px, 1.5vw, 28px);
    background-color: var(--blue-0);
    border-radius: var(--br-block);
    text-decoration: none;
    color: inherit;
    position: relative;
  }

  .promo-widget-slider {
    @media screen and (max-width: 992px) {
      grid-column: span 4;
    }

    @media screen and (max-width: 720px) {
      grid-column: span 2;
    }
  }

  &__block--delivery,
  &__block--contacts,
  &__block--faq,
  &__block--about {
    overflow: hidden;

    @media screen and (max-width: 720px) {
      padding: 20px;
      min-height: min(200px, 22vh);
    }

    .hero__block-content {
      // height: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      // align-content: stretch;
    }

    .hero__block-title {
      font-weight: 500;
      @include fluid-text(36, 16);
      line-height: 110%;
      letter-spacing: -0.04em;
      color: var(--blue);

      @include tablet-bottom {
        max-width: 60%;
        // font-size: 16px;
      }

      @include mobile {
        font-size: 20px;
      }
    }

    .hero__block-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      // position: relative;
      z-index: 3;
    }

    .hero__block-text {
      @include fluid-text(16, 10);

      @include mobile {
        max-width: 70%;
      }
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

      @include laptop {
        width: 50px;
        height: 50px;
      }

      @include tablet {
        width: 36px;
        height: 36px;
      }

      @include tablet-bottom {
        position: absolute;
        top: 0;
        right: 0;
      }

      @include mobile {
        position: static;
        width: 50px;
        height: 50px;
      }

      svg {
        width: 10px;
        height: 10px;
        color: var(--blue);

        @include tablet {
          width: 8px;
          height: 8px;
        }
      }
    }

    .hero__block-bottom-img {
      position: absolute;
      bottom: 0;
      left: 0;

      @include mobile {
        left: 50%;
      }

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
</style>
