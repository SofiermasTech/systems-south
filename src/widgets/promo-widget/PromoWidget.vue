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
.promo-widget {
  width: 100%;
  height: 100%;
  padding: 20px 24px 52px 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;

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
  }

  &__top-sticker {
    width: 40px;
    height: 40px;
    background-color: var(--white);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: var(--orange);
    }
  }

  .timer {
    background-color: var(--white-0);
    padding: 12px;
    color: var(--white);
    gap: 8px;
    position: static;

    &__value {
      font-weight: 600;
      font-size: 16px;
      text-align: right;
      // color: var(--white);
    }

    &__text {
    }
  }

  &__title {
    margin-top: auto;
    font-weight: 600;
    font-size: 20px;
    line-height: 110%;
    color: var(--white);
  }

  &__link {
    &.base-button {
      width: 130px;
      background-color: var(--white);
      font-weight: 500;
      font-size: 12px;
      color: var(--black);
      text-decoration: none;
      text-align: center;
      display: inline;
    }
  }
}

.base-slider.promo-widget-slider {
  // max-width: 22vw;
  width: 100%;
  height: 100%;

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
