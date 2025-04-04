<template>
  <article class="product-card">
    <div class="product-card__top">
      <div class="product-card__top-info">
        <p class="product-card__top-info-stock">В наличии</p>
        <p class="product-card__top-info-article">Арт: {{ product.article }}</p>
      </div>
      <div class="product-card__top-like">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
          <path
            stroke="#242527"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M13.914 1.5c-1.704 0-3.174.998-3.914 2.453C9.261 2.498 7.79 1.5 6.087 1.5c-2.442 0-4.42 2.047-4.42 4.567s1.514 4.83 3.471 6.728C7.095 14.693 10 16.5 10 16.5s2.812-1.777 4.863-3.705c2.187-2.055 3.47-4.2 3.47-6.728 0-2.527-1.978-4.567-4.42-4.567Z"
          />
        </svg>
      </div>
    </div>
    <div class="product-card__images">
      <div class="product-card__images-wrapper">
        <div class="product-card__image-item">
          <div class="product-card__img">
            <img :src="product.image" :alt="product.name" width="376" height="234" loading="lazy" />
          </div>
        </div>
      </div>
      <ul class="product-card__pagination-list">
        <li class="product-card__pagination-item active-item"></li>
        <li class="product-card__pagination-item"></li>
      </ul>
    </div>
    <div class="product-card__text">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
    </div>
    <div class="product-card__bottom">
      <p class="product-card__price">{{ product.price }} ₽</p>
      <base-button class="product-card__btn-card">
        <span>Добавить в корзину</span>
      </base-button>
    </div>
  </article>
</template>

<script>
import BaseButton from '@/components/common/BaseButton.vue'

export default {
  name: 'ProductCard',
  components: {
    BaseButton,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.product-card {
  max-width: 374px;
  width: 100%;
  padding: 16px;
  background-color: var(--white);
  border: 1px solid var(--blue-100);
  border-radius: var(--br-block);
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__top-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__top-info-stock {
    font-weight: 600;
    font-size: 12px;
    color: var(--green);
  }

  &__top-info-article {
    font-weight: 600;
    font-size: 12px;
    color: var(--grey-200);
  }

  &__top-like {
    border: 1px solid var(--grey-100);
    border-radius: 50%;
    padding: 12px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 18px;
    }
  }

  &__images {
    position: relative;
  }

  &__images-wrapper {
  }

  &__image-item {
  }

  &__img {
  }

  &__pagination-list {
    display: flex;
    gap: 4px;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 50%;
  }

  &__pagination-item {
    width: 6px;
    height: 6px;
    transform: translateX(-50%);
    background-color: var(--blue-100);
    border-radius: 50%;

    &.active-item {
      background-color: var(--blue-200);
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 8px;

    h3 {
      margin: 0;
      font-weight: 600;
      font-size: 16px;
    }
    p {
      margin: 0;
      max-width: 95%;
      width: 100%;
      font-weight: 400;
      font-size: 14px;
    }
  }

  &__bottom {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__price {
    font-weight: 600;
    font-size: 24px;
    line-height: 110%;
    color: var(--blue);
  }

  &__btn-card {
  }
}
</style>
