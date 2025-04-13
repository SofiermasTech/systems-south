<template>
  <section class="product-page container">
    <BreadcrumbsList class="product-page__breadcrumbs" />
    <section class="product-general">
      <div class="product-general__top">
        <h1 class="product-general__title">{{ product.description }}</h1>
        <div class="product-general__info">
          <StockStatus :stock="product.stock" />
          <p class="product-general__info-article aticle-number">Арт: {{ product.article }}</p>
          <div class="product-general__info-btn-favorite">
            <FavoriteButton :product="product" />
            <span>В избранное</span>
          </div>
          <div class="product-general__info-brand">
            <span class="product-general__info-brand-title">Бренд</span>
            <img
              class="product-general__info-brand-img"
              src="../../assets/images/product-logo.png"
              alt=""
              width="91"
              height="24"
            />
          </div>
        </div>
      </div>
      <div class="product-general__bottom">
        <div class="product-general__slider"></div>
        <div class="product-general__chars">
          <h2 class="product-general__chars-title">Характеристики</h2>
          <dl class="product-general__chars-list">
            <div class="product-general__chars-list-item">
              <dt>Хэшрейт</dt>
              <dd>190 TH/s</dd>
            </div>
          </dl>
        </div>
        <div class="product-general__details">
          <div class="product-general__purchase">
            <p class="product-general__price">{{ formattedPrice }} ₽</p>
            <div class="product-general__quantity">
              <button class="product-general__quantity-btn" @click="decrementQuantity">-</button>
              <span class="product-general__quantity-value">{{ quantity }}</span>
              <button class="product-general__quantity-btn" @click="incrementQuantity">+</button>
            </div>
            <base-button class="product-general__btn-cart"
              ><span>Добавить в корзину</span></base-button
            >
          </div>
          <div class="product-general__contacts">
            <a href="tel:+78612125445" class="product-general__contact-item">+7 (861) 212-54-45</a>
            <a href="mailto:sales@ingsystemyuga.ru" class="product-general__contact-item"
              >sales@ingsystemyuga.ru</a
            >
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import { useCatalogStore } from '@/shared/stores/catalog'
// import { useFavoritesStore } from '@/shared/stores/favorites'
import BreadcrumbsList from '@widgets/intro-pages/BreadcrumbsList.vue'
import FavoriteButton from '@/entities/product/FavoriteButton.vue'

export default {
  data() {
    return {
      quantity: 1,
    }
  },
  components: {
    BreadcrumbsList,
    FavoriteButton,
  },
  computed: {
    product() {
      const catalogStore = useCatalogStore()
      const productId = Number(this.$route.params.id)
      return catalogStore.getProductById(productId)
    },
    formattedPrice() {
      return this.product.price.toLocaleString('ru-RU')
    },
  },
  methods: {
    incrementQuantity() {
      this.quantity++
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
  },
}
</script>
<style lang="scss">
.product-page {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.product-general {
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  &__top {
  }

  &__title {
    max-width: 60%;
    width: 100%;
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 32px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--black);
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  &__info-article {
  }

  &__info-btn-favorite {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__info-brand {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__info-brand-title {
    font-weight: 500;
    font-size: 16px;
    color: var(--grey-200);
  }

  &__bottom {
    height: 45vh;
    max-height: 470px;
    display: grid;
    grid-template-columns: 1.5fr 1.2fr 1fr;
    gap: 16px;
  }

  &__slider {
    background-color: var(--blue-100);
  }

  &__chars {
    padding: 32px;
    border: 1px solid var(--blue-100);
    border-radius: var(--br-block);
  }

  &__chars-title {
    margin-bottom: 28px;
    font-weight: 600;
    font-size: 24px;
    line-height: 110%;
    color: var(--black);
  }

  &__chars-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    dt {
      flex-grow: 1;
      position: relative;
      overflow: hidden;
      font-weight: 500;
      font-size: 16px;
      color: var(--grey-200);

      &::after {
        content: '_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _';
        position: absolute;
        color: var(--blue-100);
      }
    }

    dd {
      margin: 0;
      font-weight: 500;
      font-size: 16px;
      text-align: right;
      color: var(--black);
    }
  }

  &__details {
    background-color: var(--blue-0);
    border-radius: var(--br-block);
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px;
  }

  &__purchase {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    row-gap: 32px;
    column-gap: 18px;
  }

  &__price {
    grid-column: span 2;
    font-weight: 500;
    font-size: 40px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__quantity {
    background-color: var(--white);
    border: 1px solid var(--grey-100);
    border-radius: 500px;
    padding: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__quantity-btn {
    background-color: var(--grey-100);
    border: none;
    border-radius: 500px;
    width: 32px;
    height: 32px;
    font-weight: 500;
  }

  &__quantity-value {
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    color: var(--black);
  }

  &__btn-cart {
    width: 100% !important;
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__contact-item {
    font-weight: 600;
    font-size: 24px;
    line-height: 110%;
    color: var(--black);
    text-decoration: none;
  }
}
</style>
