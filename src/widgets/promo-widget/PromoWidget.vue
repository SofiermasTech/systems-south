<template>
  <BaseSlider :slides="promoSlides" :options="sliderOptions" class="promo-widget-slider">
    <template #default="{ item }">
      <div class="promo-widget">
        <div class="promo-widget__top">
          <span class="promo-widget__top-sticker">
            <BaseIcon name="StickerSaleIcon" />
          </span>
          <BaseTimer :promo="item" />
        </div>
        <h3 class="promo-widget__title">
          {{ item.title }}
        </h3>
        <RouterLink :to="`/promo/${item.id}`" class="promo-widget__link base-button"
          >Подробнее</RouterLink
        >
        <div class="promo-widget__img">
          <img :src="item.image" alt="" loading="lazy" />
        </div>
        <div class="promo-widget__img-overlay"></div>
      </div>
    </template>
  </BaseSlider>
</template>

<script>
import BaseSlider from '@/shared/ui/BaseSlider.vue'
import BaseTimer from '@/shared/ui/BaseTimer.vue'
import { usePromoStore } from '@/shared/stores/promo.js'

export default {
  name: 'PromoWidget',
  components: {
    BaseSlider,
    BaseTimer,
  },
  data() {
    return {
      sliderOptions: {
        slidesPerView: 1,
        spaceBetween: 8,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          type: 'bullets',
        },
      },
    }
  },
  computed: {
    promoSlides() {
      const promoStore = usePromoStore()
      return promoStore.getPromo
    },
  },
  created() {
    const promoStore = usePromoStore()
    if (!promoStore.promo.length) {
      promoStore.loadPromo()
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.promo-widget {
  width: 100%;
  height: 100%;
  padding: 20px 24px 52px 24px;
  border-radius: var(--br-block);
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;

  @include laptop-bottom {
    padding: 16px;
    padding-bottom: 50px;
  }

  @include tablet {
    padding: 12px;
    gap: 16px;
  }

  @media screen and (max-width: 992px) {
    padding: 14px;
    padding-left: 10%;
  }

  @media screen and (max-width: 720px) {
    min-height: 150px;
  }

  @include mobile {
    padding: 20px;
    padding-bottom: 50px;
    min-height: 270px;
  }

  &__img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 16px;
    }
  }

  &__img-overlay {
    background-color: rgba($color: #000000, $alpha: 0.5);
    border-radius: 16px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }

  &__top {
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 992px) {
      width: calc(100% - 28px);
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
    }

    @include mobile {
      position: static;
      width: 100%;
      transform: translateX(0);
    }
  }

  &__top-sticker {
    width: 40px;
    height: 40px;
    background-color: var(--white);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    @include laptop-bottom {
      width: 30px;
      height: 30px;
    }

    svg {
      color: var(--orange);
      width: 20px;
      height: 20px;

      @include laptop-bottom {
        width: 18px;
        height: 18px;
      }
    }
  }

  .timer {
    background-color: var(--white-0);
    padding: 12px;
    color: var(--white);
    gap: 8px;
    position: static;

    @include laptop-bottom {
      padding: 8px;
      gap: 6px;
    }

    &__value {
      font-weight: 600;
      font-size: 16px;
      text-align: right;
      // color: var(--white);

      @include laptop-bottom {
        font-size: 12px;
      }
    }

    &__text {
    }
  }

  &__title {
    margin-top: auto;
    max-width: 80%;
    font-weight: 600;
    @include fluid-text(24, 14);
    line-height: 110%;
    color: var(--white);

    @media screen and (max-width: 992px) {
      margin-top: 0;
      max-width: 50%;
    }

    @include mobile {
      margin-top: auto;
      max-width: 80%;
    }
  }

  &__link {
    &.base-button {
      width: clamp(96px, 6.5vw, 130px);
      padding-inline: 0;
      background-color: var(--white);
      font-weight: 500;
      font-size: 12px;
      color: var(--black);
      text-decoration: none;
      text-align: center;
      display: inline;

      @include tablet {
        font-size: 10px;
      }
    }
  }
}

.base-slider.promo-widget-slider {
  // max-width: 22vw;
  width: 100%;
  height: 100%;

  // @include tablet-bottom {
  //   grid-column: span 4;
  // }

  .swiper.swiper-initialized {
    height: 100%;
  }

  .swiper-pagination {
    width: 90%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 24px;
    z-index: 5;
    display: flex;
    gap: 8px;

    @media screen and (max-width: 992px) {
      width: calc(90% - 14px);
      left: 10%;
      transform: translateX(0);
    }

    @include mobile {
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .swiper-pagination-bullet {
    flex-grow: 1;
    height: 3px;
    background-color: var(--white-0);
    border-radius: 50px;

    &.swiper-pagination-bullet-active {
      background-color: var(--white);
    }
  }
}
</style>
