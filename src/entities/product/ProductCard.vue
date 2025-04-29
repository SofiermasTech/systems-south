<template>
  <article v-if="!isHorizontal" class="product-card card-vertical" @click="goToProduct">
    <div class="product-card__top">
      <div class="product-card__top-info">
        <StockStatus :stock="product.stock" />
        <p class="product-card__top-info-article article-number">Арт: {{ product.article }}</p>
      </div>
      <FavoriteButton :product="product" @click.stop />
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
      <base-button v-if="!isInCart" class="product-card__btn-card" @click.stop="addToCart">
        <span>Добавить в корзину</span>
      </base-button>
      <ProductQuantity v-else :product-id="productId" :initial-quantity="cartItemQuantity" />
    </div>
  </article>

  <article v-else class="product-card card-horizontal" @click="goToProduct">
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
    <div class="product-card__info">
      <div class="product-card__top-info">
        <StockStatus :stock="product.stock" />
        <p class="product-card__top-info-article article-number">Арт: {{ product.article }}</p>
      </div>
      <div class="product-card__text">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
      </div>
    </div>
    <div class="product-card__right">
      <p class="product-card__price">{{ formattedPrice }} ₽</p>
      <div class="product-card__right-bottom">
        <base-button v-if="!isInCart" class="product-card__btn-card" @click.stop="addToCart">
          <span>Добавить в корзину</span>
        </base-button>
        <ProductQuantity v-else :product-id="productId" :initial-quantity="cartItemQuantity" />
        <FavoriteButton :product="product" @click.stop />
      </div>
    </div>
  </article>
</template>

<script>
// import { useFavoritesStore } from '@/shared/stores/favorites'
import { useCatalogStore } from '@/shared/stores/catalog.js'
import { useCartStore } from '@/shared/stores/cart.js'
import FavoriteButton from '@/entities/product/FavoriteButton.vue'
import ProductQuantity from '@widgets/product-quantity/ProductQuantity.vue'

export default {
  name: 'ProductCard',
  components: {
    FavoriteButton,
    ProductQuantity,
  },
  props: {
    productId: {
      type: Number,
      required: true,
    },
    isHorizontal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    product() {
      const catalogStore = useCatalogStore()
      return catalogStore.getProductById(this.productId)
    },
    formattedPrice() {
      return this.product.price.toLocaleString('ru-RU')
    },
    isInCart() {
      const cartStore = useCartStore()
      return cartStore.cartItems.some((item) => item.id === this.productId)
    },
    cartItemQuantity() {
      const cartStore = useCartStore()
      const cartItem = cartStore.cartItems.find((item) => item.id === this.productId)
      return cartItem ? cartItem.quantity : 0
    },
  },
  methods: {
    addToCart() {
      if (!this.product) {
        console.error('Товар не найден')
        return
      }
      const cartStore = useCartStore()
      cartStore.addToCart(this.product, 1)
    },
    goToProduct() {
      this.$router.push({ name: 'ProductPage', params: { id: this.productId } })
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
  transition: all 0.3s ease;

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__top-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__top-info-article {
  }

  &__images {
    position: relative;
    cursor: pointer;
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
    cursor: pointer;

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

    .product-quantity {
      max-width: 165px;
      width: 100%;
    }
  }

  &__price {
    font-weight: 600;
    font-size: 24px;
    line-height: 110%;
    color: var(--blue);
  }

  &__btn-card {
  }

  &.card-horizontal {
    max-width: 100%;
    flex-direction: row;
    gap: 16px;
    padding: 0;

    .product-card__images {
      border-radius: 16px;
      width: 280px;
      height: 234px;
    }

    .product-card__info {
      max-width: 52%;
      padding-block: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .product-card__top-info {
      flex-direction: row;
      gap: 40px;
    }

    .product-card__text {
    }

    .product-card__right {
      margin-left: auto;
      padding-block: 16px;
      padding-right: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
    }

    .product-card__right-bottom {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}

.article-number {
  font-weight: 600;
  font-size: 12px;
  color: var(--grey-200);
}
</style>
