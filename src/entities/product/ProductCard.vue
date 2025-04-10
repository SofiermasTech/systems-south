<template>
  <article class="product-card">
    <div class="product-card__top">
      <div class="product-card__top-info">
        <p
          class="product-card__top-info-stock"
          :class="{
            'stock-available': product.stock,
            'stock-unavailable': !product.stock,
          }"
        >
          {{ stockStatus }}
        </p>
        <p class="product-card__top-info-article">Арт: {{ product.article }}</p>
      </div>
      <button type="button" class="product-card__top-like" @click="toggleFavorite">
        <svg
          v-if="!isInFavorites"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            stroke="#242527"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M13.914 1.5c-1.704 0-3.174.998-3.914 2.453C9.261 2.498 7.79 1.5 6.087 1.5c-2.442 0-4.42 2.047-4.42 4.567s1.514 4.83 3.471 6.728C7.095 14.693 10 16.5 10 16.5s2.812-1.777 4.863-3.705c2.187-2.055 3.47-4.2 3.47-6.728 0-2.527-1.978-4.567-4.42-4.567Z"
          />
        </svg>
        <svg
          v-else
          class="like-active"
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="#1C71B7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9127 0.5C11.2093 0.5 9.73852 1.4975 8.99935 2.9525C8.26018 1.4975 6.78935 0.5 5.08602 0.5C2.64435 0.5 0.666016 2.5475 0.666016 5.0675C0.666016 7.5875 2.18018 9.8975 4.13685 11.795C6.09352 13.6925 8.99935 15.5 8.99935 15.5C8.99935 15.5 11.811 13.7225 13.8618 11.795C16.0493 9.74 17.3327 7.595 17.3327 5.0675C17.3327 2.54 15.3543 0.5 12.9127 0.5Z"
            fill="#1C71B7"
          />
        </svg>
      </button>
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
      <p class="product-card__price">{{ formattedPrice }} ₽</p>
      <base-button class="product-card__btn-card">
        <span>Добавить в корзину</span>
      </base-button>
    </div>
  </article>
</template>

<script>
import { useFavoritesStore } from '@/shared/stores/favorites'
import { useCatalogStore } from '@/shared/stores/catalog'

export default {
  name: 'ProductCard',
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      catalogStore: null,
      favoritesStore: null,
    }
  },
  created() {
    this.catalogStore = useCatalogStore()
    this.favoritesStore = useFavoritesStore()
  },
  computed: {
    product() {
      return this.catalogStore.getProductById(this.productId)
    },
    isInFavorites() {
      return this.favoritesStore.isFavorite(this.productId)
    },
    formattedPrice() {
      return this.product.price.toLocaleString('ru-RU')
    },
    stockStatus() {
      return this.product
        ? this.product.stock
          ? 'В наличии'
          : 'Нет в наличии'
        : 'Уточните наличие'
    },
  },
  // mounted() {
  //   const catalogStore = useCatalogStore()
  //   catalogStore.loadProducts()
  // },
  methods: {
    toggleFavorite() {
      if (this.isInFavorites) {
        this.favoritesStore.removeFromFavorites(this.productId)
      } else {
        this.favoritesStore.addToFavorites(this.product)
      }
      this.$emit('toggle-favorite', this.product)
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

    &.stock-available {
      color: var(--green);
    }

    &.stock-unavailable {
      color: var(--grey-200);
    }
  }

  &__top-info-article {
    font-weight: 600;
    font-size: 12px;
    color: var(--grey-200);
  }

  &__top-like {
    border: 1px solid var(--grey-100);
    background-color: transparent;
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

    .like-active {
      color: var(--blue);
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
