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

  &--hero {
    grid-column: span 3;
    padding: 32px 60px 44px 24px;
    background-position: -350% center;
  }

  &--categories {
    padding: 32px 24px 40px;
    background-position: -50% center;
    background-size: 140%;
  }

  &__wrapper {
    max-width: 47%;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__block-top {
    display: flex;
  }

  &__top-sticker {
    background-color: var(--black);
    border-radius: 50%;
    padding: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 18px;
      height: 20px;
      color: var(--orange);
    }
  }

  &__top-text {
    padding: 12px 14px;
    border-radius: 500px;
    background-color: var(--white);
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 12px;
  }

  &__title {
    font-weight: 500;
    font-size: 40px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__block-info {
    margin-top: auto;
    display: flex;
    gap: 24px;
  }

  &__info-item {
    span {
      font-weight: 500;
      font-size: 14px;
      color: var(--grey-200);
    }

    p {
      margin-top: 12px;
      font-weight: 600;
      font-size: 16px;
    }
  }

  &__link {
    margin-top: 8px;
    background-color: var(--black);
    text-decoration: none;

    &.base-button {
      background-color: var(--black);
    }
  }

  &__block-img {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>
