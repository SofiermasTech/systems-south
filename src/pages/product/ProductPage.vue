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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="20"
                  height="22"
                  viewBox="0 0 20 22"
                >
                  <path
                    stroke="#242527"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.7 20.6h-6a2.4 2.4 0 0 1-2.4-2.4V3.8a2.4 2.4 0 0 1 2.4-2.4h10.8a2.4 2.4 0 0 1 2.4 2.4v4.8M5.5 6.2h7.2M5.5 9.8h7.2m0 4.754v2.944c0 1.455 1.552 2.79 3.007 2.79 1.454 0 2.993-1.335 2.993-2.79V13.78c0-.77-.443-1.552-1.428-1.552-1.053 0-1.565.782-1.565 1.552v3.564M5.5 13.4h3.6"
                  />
                </svg>
              </span>
              <h4 class="about-product__doc-item-title">Сертификат соответствия</h4>
              <p class="about-product__doc-item-subtitle">PDF&emsp;556 кб</p>
            </div>
          </div>
        </div>
        <div class="about-product__other">
          <div class="about-product__other-block">
            <span class="about-product__other-img">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  fill="#9F9E9E"
                  d="m12.72 8-.493-.082a.5.5 0 0 0 .493.582V8Zm-11 0v-.5a.5.5 0 0 0-.5.5h.5Zm2 10.5h11.36v-1H3.72v1Zm12.56-11h-3.56v1h3.56v-1Zm-3.067.582.806-4.835-.986-.165-.806 4.836.986.164ZM12.54 1.5h-.213v1h.213v-1ZM9.414 3.059 6.898 6.832l.832.555 2.515-3.774-.83-.554ZM5.65 7.5H1.72v1h3.93v-1ZM1.22 8v8h1V8h-1Zm16.312 8.49 1.2-6-.98-.196-1.2 6 .98.196ZM6.898 6.832A1.5 1.5 0 0 1 5.65 7.5v1a2.5 2.5 0 0 0 2.08-1.113l-.832-.555Zm7.121-3.585A1.5 1.5 0 0 0 12.54 1.5v1a.5.5 0 0 1 .494.582l.985.165ZM16.28 8.5a1.5 1.5 0 0 1 1.472 1.794l.98.196a2.5 2.5 0 0 0-2.45-2.99l-.002 1Zm-1.2 10a2.5 2.5 0 0 0 2.452-2.01l-.98-.196A1.5 1.5 0 0 1 15.08 17.5v1Zm-2.754-17a3.5 3.5 0 0 0-2.913 1.559l.832.554a2.5 2.5 0 0 1 2.08-1.113l.001-1Zm-8.606 16a1.5 1.5 0 0 1-1.5-1.5h-1a2.5 2.5 0 0 0 2.5 2.5v-1Z"
                />
                <path stroke="#9F9E9E" d="M5.72 8v10" />
              </svg>
            </span>
            <h3 class="about-product__other-title h3-title">Гарантия качества</h3>
            <p class="about-product__other-text">
              Узнайте о наших простых и безопасных способах оплаты, а также о вариантах доставки,
              которые мы предлагаем.
            </p>
          </div>
          <div class="about-product__other-block">
            <span class="about-product__other-img">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="22"
                height="20"
                viewBox="0 0 22 20"
              >
                <path
                  stroke="#9F9E9E"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="1.5"
                  d="M7.364 15.91a1.818 1.818 0 1 0 0-3.637 1.818 1.818 0 0 0 0 3.636Zm9.09 0a1.818 1.818 0 1 0 0-3.637 1.818 1.818 0 0 0 0 3.636Z"
                />
                <path
                  stroke="#9F9E9E"
                  stroke-linecap="round"
                  d="M9.227 14.09h4.5V4.637a.545.545 0 0 0-.545-.545H1m4.227 10H3.364a.546.546 0 0 1-.546-.546V9.091"
                />
                <path
                  stroke="#9F9E9E"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M1.91 6.818h3.636"
                />
                <path
                  stroke="#9F9E9E"
                  stroke-linecap="round"
                  d="M13.727 6.818h5.1a.545.545 0 0 1 .498.324l1.628 3.662c.03.07.047.144.047.22v2.521a.546.546 0 0 1-.546.546h-1.727m-5 0h.91"
                />
              </svg>
            </span>
            <h3 class="about-product__other-title h3-title">Быстрая доставка</h3>
            <p class="about-product__other-text">
              Узнайте о наших простых и безопасных способах оплаты, а также о вариантах доставки,
              которые мы предлагаем.
            </p>
          </div>
          <div class="about-product__other-block">
            <span class="about-product__other-img">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5162 2.81869C11.2021 1.50544 10.5459 0.848387 9.69334 0.604437C8.84079 0.359636 7.93554 0.568736 6.12588 0.986937L5.08208 1.22749C3.55888 1.57854 2.79728 1.75449 2.27537 2.27554C1.75347 2.79659 1.57922 3.55989 1.22732 5.08225L0.985921 6.12605C0.56857 7.93655 0.35947 8.84095 0.60342 9.69351C0.848221 10.5461 1.50527 11.2023 2.81853 12.5155L4.37403 14.071C6.66053 16.3584 7.80294 17.4999 9.22244 17.4999C10.6428 17.4999 11.7852 16.3575 14.0708 14.0719C16.3574 11.7854 17.4998 10.643 17.4998 9.22261C17.4998 8.0819 16.762 7.1197 15.2864 5.5999"
                  stroke="#9F9E9E"
                  stroke-linecap="round"
                />
              </svg>
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
