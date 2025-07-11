<template>
  <div class="top-sale" :class="`top-sale--${theme}`">
    <div class="top-sale__wrapper">
      <div class="top-sale__block-top">
        <span class="top-sale__top-sticker">
          <BaseIcon name="StickerSaleIcon" />
        </span>
        <p class="top-sale__top-text">ТОП-продаж</p>
      </div>
      <h2 class="top-sale__title">{{ currentProduct.name }}</h2>
      <div class="top-sale__block-info">
        <div class="top-sale__info-item">
          <span>Модель</span>
          <p>{{ currentProduct.brand }}</p>
        </div>
        <div class="top-sale__info-item">
          <span>Материал</span>
          <p>{{ currentProduct.subcategory }}</p>
        </div>
        <div class="top-sale__info-item">
          <span>Цена</span>
          <p>{{ currentProduct.price }} ₽</p>
        </div>
      </div>
      <RouterLink :to="`/product/${currentProduct.id}`" class="top-sale__link base-button"
        >На страницу товара</RouterLink
      >
    </div>
    <div class="top-sale__block-img">
      <img :src="currentProduct.images[0]" :alt="currentProduct.name" width="535" height="424" />
    </div>
  </div>
</template>

<script>
import { useCatalogStore } from '@/shared/stores/catalog'

export default {
  name: 'BaseCardTopSale',
  props: {
    data: {
      type: [Array, Object],
      required: true,
    },
    theme: {
      type: String,
      default: '',
    },
    activeCategory: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      catalogStore: useCatalogStore(),
    }
  },
  computed: {
    currentProduct() {
      if (this.activeCategory) {
        const category = this.data.find((item) => item.title === this.activeCategory)
        return this.catalogStore.getProductById(category.productId)
      }

      const item = this.data.find((item) => item.productId !== undefined && item.productId !== null)
      if (item && item.productId) {
        const product = this.catalogStore.getProductById(item.productId)
        return product || {}
      }
      return {}
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.top-sale {
  width: 100%;
  height: 100%;
  padding: 24px;
  background-color: var(--blue-0);
  border-radius: var(--br-block);
  text-decoration: none;
  color: inherit;
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  background-image: url('@/assets/images/hero-main-back.png');
  background-repeat: no-repeat;

  @media screen and (max-width: 720px) {
    flex-direction: column;
    gap: 20px;
  }

  &--hero {
    grid-column: span 3;
    padding: 0;
    background-position: 400% center;

    @include desktop {
      background-position: -300% center;
    }

    @include laptop-bottom {
      background-position: right -250% center;
      background-size: 90%;
    }

    @media screen and (max-width: 992px) {
      grid-column: span 4;
    }

    @media screen and (max-width: 720px) {
      grid-column: span 2;
      padding: 24px;
      background-image: none;
    }

    @media screen and (max-width: 560px) {
      // height: 50vh;
      padding: 24px 0;
      display: flex;
      flex-direction: column;

      &::before {
        content: '';
        width: 120vw;
        height: 100%;
        position: absolute;
        top: 0;
        left: -20px;
        right: 0;
        bottom: 0;
        z-index: -1;
        background-color: var(--blue-0);
      }

      &::after {
        content: '';
        width: 120vw;
        height: 100%;
        position: absolute;
        top: 0;
        left: -20px;
        right: 0;
        bottom: 0;
        z-index: 1;

        background-image: url('@/assets/images/hero-main-back.png');
        background-repeat: no-repeat;
        background-size: 130%;
        background-position: center -250%;
      }
    }

    .top-sale__block-img {
      padding-right: clamp(24px, 3vw, 60px);
      padding-block: clamp(16px, 1.5vw, 24px);
      // backdrop-filter: opacity(70%);
      // background-image: url('@/assets/images/hero-main-back.png');
      // background-repeat: no-repeat;

      @media screen and (max-width: 720px) {
        padding: 0;
        z-index: 3;
      }
    }
  }

  &--categories {
    padding: 32px 24px 40px;
    background-position: -50% center;
    background-size: 140%;

    @include tablet {
      padding: 14px 20px;
    }

    @include mobile {
      gap: 16px;
      margin: 0 auto;
      padding: 20px;
      min-height: min(470px, 55vh);
      max-width: 450px;
      background-position: 40% 200px;
      background-size: 200%;
    }
  }

  &__wrapper {
    max-width: 52%;
    width: 100%;
    padding: clamp(20px, 1.6vw, 32px) clamp(14px, 1.5vw, 32px) clamp(20px, 3vw, 60px);
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media screen and (max-width: 720px) {
      max-width: 100%;
      display: contents;
    }
  }

  &__block-top {
    display: flex;

    @media screen and (max-width: 720px) {
      order: 1;
    }
  }

  &__top-sticker {
    background-color: var(--black);
    border-radius: 50%;
    // padding: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    @include laptop-bottom {
      width: 30px;
      height: 30px;
    }

    svg {
      width: 18px;
      height: 20px;
      color: var(--orange);

      @include laptop-bottom {
        width: 16px;
        height: 16px;
      }
    }
  }

  &__top-text {
    padding: 12px 14px;
    border-radius: 500px;
    background-color: var(--white);
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 12px;

    @include laptop-bottom {
      font-size: 10px;
      padding-block: 10px;
    }
  }

  &__title {
    font-weight: 500;
    @include fluid-text(48, 20);
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);

    @media screen and (max-width: 720px) {
      order: 2;
    }

    @include mobile {
      font-size: 24px;
    }
  }

  &__block-info {
    margin-top: auto;
    display: flex;
    gap: 24px;

    @media screen and (max-width: 720px) {
      order: 4;
      z-index: 3;
    }
  }

  &__info-item {
    span {
      font-weight: 500;
      @include fluid-text(16, 10);
      color: var(--grey-200);
    }

    p {
      margin-top: 12px;
      font-weight: 600;
      @include fluid-text(20, 12);

      @include mobile {
        font-weight: 700;
        
      }
    }
  }

  &__link {
    margin-top: 8px;
    background-color: var(--black);
    text-decoration: none;

    &.base-button {
      background-color: var(--black);
    }

    @media screen and (max-width: 720px) {
      order: 5;
      margin-top: 0;
      z-index: 3;
    }
  }

  &__block-img {
    // flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }

    @media screen and (max-width: 720px) {
      max-width: 75%;
      max-height: 230px;
      align-self: center;
      order: 3;

      img {
        object-fit: contain;
      }
    }
  }
}
</style>
