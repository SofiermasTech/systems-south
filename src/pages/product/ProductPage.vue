<template>
  <section class="product-page container">
    <BreadcrumbsList class="product-page__breadcrumbs" />
    <section class="product-general">
      <div class="product-general__top">
        <h1 class="product-general__title">{{ product.name }}</h1>
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
            <ProductQuantity
              :product-id="Number($route.params.id)"
              :initial-quantity="cartItemQuantity"
            />
            <base-button class="product-general__btn-cart" @click.stop="addToCart"
              ><span>Добавить в корзину</span></base-button
            >
          </div>
          <ContactsPageBlock />
        </div>
      </div>
    </section>

    <section class="about-product">
      <h2 class="about-product__title">О товаре</h2>
      <div class="about-product__content">
        <div class="about-product__description">
          <ul class="about-product__tabs">
            <li
              class="about-product__tab"
              @click="productTab = 't1'"
              :class="{ 'tab-active': productTab === 't1' }"
            >
              <h3>Описание</h3>
            </li>
            <li
              class="about-product__tab"
              @click="productTab = 't2'"
              :class="{ 'tab-active': productTab === 't2' }"
            >
              <h3>Характеристики</h3>
            </li>
            <li
              class="about-product__tab"
              @click="productTab = 't3'"
              :class="{ 'tab-active': productTab === 't3' }"
            >
              <h3>Доставка и оплата</h3>
            </li>
          </ul>

          <div class="about-product__panels">
            <div id="section-product-tab1" class="about-product__panel" v-if="productTab === 't1'">
              <p>{{ product.description }}</p>
            </div>
            <div id="section-product-tab2" class="about-product__panel" v-if="productTab === 't2'">
              <dl class="about-product__characteristics characteristic">
                <div class="characteristic__item">
                  <dt>Алгоритм</dt>
                  <dd>SHA-256</dd>
                </div>
                <div class="characteristic__item">
                  <dt>Хэшрейт</dt>
                  <dd>about-product</dd>
                </div>
              </dl>
            </div>
            <div id="section-product-tab3" class="about-product__panel" v-if="productTab === 't3'">
              <p>Что-то о доставке</p>
            </div>
          </div>
        </div>
        <div class="about-product__doc">
          <h3 class="about-product__doc-title h3-title">Документация</h3>
          <div class="about-product__doc-list">
            <div class="about-product__doc-item">
              <span class="about-product__doc-item-img">
               <BaseIcon name="DocumentIcon" />
              </span>
              <h4 class="about-product__doc-item-title">Сертификат соответствия</h4>
              <p class="about-product__doc-item-subtitle">PDF&emsp;556 кб</p>
            </div>
          </div>
        </div>
        <div class="about-product__other">
          <div class="about-product__other-block">
            <span class="about-product__other-img">
             <BaseIcon name="GuaranteeIcon" />
            </span>
            <h3 class="about-product__other-title h3-title">Гарантия качества</h3>
            <p class="about-product__other-text">
              Узнайте о наших простых и безопасных способах оплаты, а также о вариантах доставки,
              которые мы предлагаем.
            </p>
          </div>
          <div class="about-product__other-block">
            <span class="about-product__other-img">
              <BaseIcon name="DeliveryIcon" />
            </span>
            <h3 class="about-product__other-title h3-title">Быстрая доставка</h3>
            <p class="about-product__other-text">
              Узнайте о наших простых и безопасных способах оплаты, а также о вариантах доставки,
              которые мы предлагаем.
            </p>
          </div>
          <div class="about-product__other-block">
            <span class="about-product__other-img">
             <BaseIcon name="AccessiblePriceIcon" />
            </span>
            <h3 class="about-product__other-title h3-title">Доступные цены</h3>
            <p class="about-product__other-text">
              Узнайте о наших простых и безопасных способах оплаты, а также о вариантах доставки,
              которые мы предлагаем.
            </p>
          </div>
        </div>
      </div>
    </section>
  </section>
  <ProductSection
    :title="recProductsTitle"
    filter-type="recommended"
    @toggle-favorite="handleToggleFavorite"
  />
</template>
<script>
import { useCatalogStore } from '@/shared/stores/catalog'
import { useCartStore } from '@/shared/stores/cart'
import BreadcrumbsList from '@widgets/intro-pages/BreadcrumbsList.vue'
import FavoriteButton from '@/entities/product/FavoriteButton.vue'
import ProductQuantity from '@widgets/product-quantity/ProductQuantity.vue'
import ProductSection from '@widgets/product-section/ProductSection.vue'

export default {
  data() {
    return {
      recProductsTitle: 'Рекомендуем',
      productTab: 't1',
    }
  },
  components: {
    BreadcrumbsList,
    FavoriteButton,
    ProductQuantity,
    ProductSection,
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
    cartItemQuantity() {
      const cartStore = useCartStore()
      const productId = Number(this.$route.params.id)
      const cartItem = cartStore.cartItems.find((item) => item.id === productId)
      return cartItem ? cartItem.quantity : 0
    },
  },
  methods: {
    addToCart() {
      const cartStore = useCartStore()
      cartStore.addToCart(this.product, 1)
    },
    handleToggleFavorite(product) {
      this.$emit('toggle-favorite', product)
    },
  },
}
</script>
<style lang="scss">
.product-page {
  margin-top: 40px;
  margin-bottom: 80px;
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

    .product-quantity {
      width: 100%;
    }
  }

  &__price {
    grid-column: span 2;
    font-weight: 500;
    font-size: 40px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__btn-cart {
    width: 100% !important;
  }
}

.about-product {
  &__title {
    margin-bottom: 32px;
    font-weight: 500;
    font-size: 32px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__content {
    display: grid;
    grid-template-columns: 2fr 1fr 1.2fr;
    gap: 16px;
  }

  &__description {
    max-width: 580px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  &__tab {
    padding: 16px 16px 8px 16px;
    cursor: pointer;

    h3 {
      margin: 0;
      font-weight: 500;
      font-size: 16px;
      text-align: center;
      color: var(--grey-200);
    }

    &.tab-active {
      border-bottom: 2px solid var(--black);

      h3 {
        font-weight: 600;
        color: var(--black);
      }
    }
  }

  &__panels {
  }

  &__panel {
  }

  &__characteristics {
  }

  .characteristic {
    &__item {
      padding-block: 16px;
      display: flex;
      justify-content: space-between;

      dt {
        flex-grow: 1;
        margin: 0;
        font-weight: 500;
        font-size: 16px;
        color: var(--grey-200);
        position: relative;

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
      }
    }
  }

  &__doc {
    padding: 24px;
    border: 1px solid var(--blue-100);
    border-radius: 16px;
  }

  &__doc-title {
    margin-bottom: 20px;
  }

  &__doc-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__doc-item {
    display: grid;
    grid-template-columns: 24px 1fr;
    grid-row: 1fr 1fr;
    column-gap: 12px;
    row-gap: 6px;
  }

  &__doc-item-img {
    grid-row: span 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__doc-item-title {
    font-weight: 500;
    font-size: 14px;
  }

  &__doc-item-subtitle {
    font-size: 12px;
    color: var(--grey-200);
  }

  &__other {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__other-block {
    min-height: 236px;
    padding: 32px 24px;
    border: 1px solid var(--blue-100);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 8px;
  }

  &__other-img {
    border: 1px solid var(--blue-0);
    background-color: var(--grey-100);
    border-radius: 50%;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__other-title {
  }

  &__other-text {
    opacity: 0.5;
    font-weight: 400;
    font-size: 14px;
    color: #000;
  }
}
.h3-title {
  font-weight: 600;
  font-size: 16px;
}
</style>
