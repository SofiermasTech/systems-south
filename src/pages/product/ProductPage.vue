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
        <div class="product-general__slider">
          <!-- Слайдер миниатюр -->
          <div class="swiper swiper-thumbs">
            <div class="swiper-wrapper">
              <div v-for="(image, index) in product.images" :key="index" class="swiper-slide">
                <img :src="image" alt="" class="slider-thumb-image" />
              </div>
            </div>
          </div>
          <!-- Главный слайдер -->
          <div class="swiper swiper-main">
            <div class="swiper-wrapper">
              <div v-for="(image, index) in product.images" :key="index" class="swiper-slide">
                <img :src="image" alt="" class="slider-main-image" />
              </div>
            </div>
            <div class="swiper-main__bottom" v-if="product.images.length > 1">
              <div class="swiper-main__pagination"></div>
              <div class="swiper-main__btns">
                <div class="swiper-main__btn-prev">
                  <BaseIcon name="SelectArrowIcon" />
                </div>
                <div class="swiper-main__btn-next">
                  <BaseIcon name="SelectArrowIcon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="product-general__chars">
          <h2 class="product-general__chars-title">Характеристики</h2>
          <dl class="product-general__chars-list">
            <div class="product-general__chars-list-item">
              <dt>Хэшрейт</dt>
              <dd>190 TH/s</dd>
            </div>
            <div class="product-general__chars-list-item">
              <dt>Добываемые монеты</dt>
              <dd>Интегрированный</dd>
            </div>
            <div class="product-general__chars-list-item">
              <dt>Хэшрейт</dt>
              <dd>190 TH/s</dd>
            </div>
          </dl>
        </div>
        <div class="product-general__details">
          <div class="product-general__purchase">
            <p class="product-general__price">{{ formattedPrice }} ₽</p>
            <base-button
              class="product-general__btn-cart"
              v-if="cartItemQuantity === 0"
              @click.stop="addToCart"
            >
              <span>Добавить в корзину</span>
            </base-button>
            <RouterLink
              to="/cart"
              class="product-general__btn-cart product-general__btn-cart--in base-button"
              v-else
            >
              <span>В корзине</span>
            </RouterLink>
          </div>
          <ContactsPageBlock @open-popup="openCallbackPopup" />
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
  <CallbackSection />
</template>
<script>
import { useCatalogStore } from '@/shared/stores/catalog.js'
import { useCartStore } from '@/shared/stores/cart.js'
import { usePopupStore } from '@/shared/stores/popup.js'
import BreadcrumbsList from '@widgets/intro-pages/BreadcrumbsList.vue'
import FavoriteButton from '@/entities/product/FavoriteButton.vue'
import ProductSection from '@widgets/product-section/ProductSection.vue'
import CallbackSection from '@/widgets/callback-section/CallbackSection.vue'
import Swiper from 'swiper'
import { Thumbs, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/thumbs'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default {
  components: {
    BreadcrumbsList,
    FavoriteButton,
    ProductSection,
    CallbackSection,
  },
  data() {
    return {
      recProductsTitle: 'Рекомендуем',
      productTab: 't1',
      mainSwiper: null,
      thumbsSwiper: null,
    }
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
  watch: {
    product(newProduct) {
      if (newProduct && newProduct.images) {
        // Уничтожаем старые экземпляры, если они существуют
        if (this.mainSwiper) this.mainSwiper.destroy()
        if (this.thumbsSwiper) this.thumbsSwiper.destroy()
        this.mainSwiper = null
        this.thumbsSwiper = null
        // Переинициализируем слайдеры
        this.initializeSwiper()
      }
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
    openCallbackPopup() {
      const popupStore = usePopupStore()
      popupStore.showPopup({
        component: 'CallbackPopup',
        props: { isVisible: true, redirectTo: this.$route.path },
      })
    },
    initializeSwiper() {
      Swiper.use([Thumbs])

      // Инициализация thumbsSwiper
      this.thumbsSwiper = new Swiper('.swiper-thumbs', {
        spaceBetween: 10,
        slidesPerView: 4,
        direction: 'vertical',
        watchSlidesProgress: true,
        touchRatio: 1,
      })

      // Инициализация mainSwiper
      this.mainSwiper = new Swiper('.swiper-main', {
        spaceBetween: 10,
        slidesPerView: 1,
        modules: [Pagination, Navigation],
        thumbs: {
          swiper: this.thumbsSwiper,
        },
        pagination: {
          el: '.swiper-main__pagination',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.swiper-main__btn-next',
          prevEl: '.swiper-main__btn-prev',
        },
      })
    },
  },
  mounted() {
    this.initializeSwiper()
  },
  beforeUnmount() {
    if (this.mainSwiper) this.mainSwiper.destroy()
    if (this.thumbsSwiper) this.thumbsSwiper.destroy()
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/utils.scss';

.product-page {
  margin-top: clamp(16px, 4vh, 40px);
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 2vw, 40px);
}

.product-general {
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @include tablet-bottom {
    gap: 20px;
  }

  &__top {
    .stock-status p {
      @include fluid-text(20, 10);
    }
  }

  &__title {
    max-width: 60%;
    width: 100%;
    margin-bottom: 20px;
    font-weight: 500;
    @include fluid-text(40, 14);
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--black);
  }

  &__info {
    display: flex;
    align-items: center;
    gap: clamp(14px, 2vw, 40px);

    @include mobile {
      flex-wrap: wrap;
    }
  }

  &__info-article {
    font-weight: 500;
    @include fluid-text(20, 10);
    color: var(--grey-200);
  }

  &__info-btn-favorite {
    display: flex;
    align-items: center;
    gap: 8px;

    @include tablet-bottom {
      gap: 4px;
    }

    span {
      @include fluid-text(20, 10);
    }
  }

  &__info-brand {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 16px;

    @include mobile {
      margin: 0;
      width: 100%;
    }

    img {
      width: clamp(53px, 5vw, 106px);
    }
  }

  &__info-brand-title {
    font-weight: 500;
    @include fluid-text(20, 10);
    color: var(--grey-200);
  }

  &__bottom {
    height: clamp(310px, 28vw, 530px);
    display: grid;
    grid-template-columns: 1.5fr 1.2fr 1fr;
    gap: 20px;

    @include laptop {
      gap: 16px;
    }

    @include tablet-bottom {
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    @include mobile {
      height: auto;
      display: flex;
      flex-direction: column;
    }
  }

  &__slider {
    max-width: 100%;
    height: 100%;
    // background-color: var(--blue-100);
    display: grid;
    grid-template-columns: clamp(56px, 6vw, 100px) 1fr;
    justify-content: space-between;
    gap: 16px;

    @include tablet-bottom {
      grid-row: span 2;
      gap: 10px;
    }

    @include mobile {
      display: flex;
      flex-direction: column-reverse;
    }

    .swiper-main {
      border: 1px solid var(--blue-100);
      border-radius: var(--br-block);

      .swiper-slide {
        align-items: flex-start;

        img {
          max-height: 400px;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }
      }
    }

    .swiper-thumbs {
      @include mobile {
        height: 80px !important;
        display: flex;
        flex-direction: row;

        &.swiper {
          margin: 0;
        }
      }

      .swiper-slide {
        border: 1px solid var(--blue-100);
        border-radius: 10px;
        width: clamp(56px, 6vw, 100px);
        max-height: clamp(56px, 6vw, 100px);

        @include mobile {
          align-items: flex-start;
          max-height: 80px;
          width: 80px;
          height: 100% !important;
        }

        img {
          border-radius: 10px;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }
      }

      .swiper-slide-thumb-active {
        border: 2px solid var(--blue-300);
      }
    }
  }

  &__chars {
    padding: clamp(14px, 1.8vw, 36px);
    border: 1px solid var(--blue-100);
    border-radius: var(--br-block);
  }

  &__chars-title {
    margin-bottom: clamp(12px, 1.8vw, 36px);
    font-weight: 600;
    @include fluid-text(28, 14);
    line-height: 110%;
    color: var(--black);
  }

  &__chars-list {
    display: flex;
    flex-direction: column;
    gap: clamp(12px, 1.5vw, 32px);
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
      @include fluid-text(20, 10);
      color: var(--grey-200);

      &::after {
        content: '_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _';
        position: absolute;
        color: var(--blue-100);
      }
    }

    dd {
      margin: 0;
      width: 35%;
      font-weight: 500;
      @include fluid-text(20, 10);
      color: var(--black);
    }
  }

  &__details {
    background-color: var(--blue-0);
    border-radius: var(--br-block);
    padding: clamp(14px, 1.8vw, 36px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px;
  }

  &__purchase {
    display: flex;
    flex-direction: column;
    // grid-template-columns: 125px 1fr;
    // align-items: center;
    row-gap: clamp(12px, 1.8vw, 36px);
    // column-gap: 18px;

    // .product-quantity {
    //   width: 100%;
    // }
  }

  &__price {
    grid-column: span 2;
    font-weight: 500;
    @include fluid-text(48, 24);
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__btn-cart {
    &.base-button {
      max-width: 215px;
      width: 100%;
      grid-column: span 2;
    }

    &--in.base-button {
      background-color: var(--white);
      color: var(--black);
      text-decoration: none;
      color: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.about-product {
  &__title {
    margin-bottom: clamp(16px, 1.8vw, 36px);
    font-weight: 500;
    @include fluid-text(36, 20);
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__content {
    display: grid;
    grid-template-columns: 2fr 1fr 1.2fr;
    gap: 16px;

    @include tablet {
      grid-template-columns: 1.4fr 1fr 1.1fr;
      gap: 10px;
    }

    @include tablet-bottom {
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    @include mobile {
      display: flex;
      flex-direction: column;
    }
  }

  &__description {
    max-width: 580px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;

    @include tablet-bottom {
      min-height: 400px;
      height: 100%;
      max-width: 380px;
    }
  }

  &__tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    @include tablet {
      gap: 2px;
    }
  }

  &__tab {
    padding: 16px 16px 8px 16px;
    cursor: pointer;

    @include tablet {
      padding: 12px 12px 8px 12px;
    }

    h3 {
      margin: 0;
      font-weight: 500;
      @include fluid-text(20, 10);
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
    p {
      @include fluid-text(16, 10);
    }
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
        @include fluid-text(20, 12);
        color: var(--grey-200);
        position: relative;
        overflow: hidden;

        &::after {
          content: '_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _';
          position: absolute;
          color: var(--blue-100);
        }
      }

      dd {
        margin: 0;
        font-weight: 500;
        @include fluid-text(20, 12);
        text-align: right;
      }
    }
  }

  &__doc {
    padding: clamp(16px, 1.5vw, 32px);
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
    @include fluid-text(16, 12);
  }

  &__doc-item-subtitle {
    @include fluid-text(14, 10);
    color: var(--grey-200);
  }

  &__other {
    display: flex;
    flex-direction: column;
    gap: 8px;

    @include tablet-bottom {
      flex-direction: row;
      grid-column: span 2;
    }

    @include mobile {
      display: flex;
      flex-direction: column;
    }
  }

  &__other-block {
    // min-height: 236px;
    padding: clamp(16px, 1.5vw, 32px);
    border: 1px solid var(--blue-100);
    border-radius: var(--br-block);
    display: flex;
    flex-direction: column;
    // justify-content: flex-end;
    gap: 8px;
  }

  &__other-img {
    margin-bottom: 36px;
    border: 1px solid var(--blue-0);
    background-color: var(--grey-100);
    border-radius: 50%;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;

    @include laptop-bottom {
      margin-bottom: 32px;
      width: 50px;
      height: 50px;
    }

    @include tablet-bottom {
      margin-bottom: 24px;
      width: 32px;
      height: 32px;
    }

    svg {
      color: var(--grey-200);

      @include laptop-bottom {
        width: 14px;
        height: 14px;
      }

      @include tablet-bottom {
        width: 12px;
        height: 12px;
      }
    }
  }

  &__other-title {
    margin-top: auto;
    @include fluid-text(14, 10);
    font-weight: 600;
  }

  &__other-text {
    opacity: 0.5;
    font-weight: 400;
    @include fluid-text(16, 10);
    color: #000;

    @include mobile {
      max-width: 70%;
      width: 100%;
    }
  }
}
</style>

<style lang="scss" scoped>
.product {
  margin-bottom: var(--section-offset);
}

/* Кастомные стили для Swiper */
.swiper-main {
  width: 100%;
  height: 100%;
  position: relative;
  user-select: none;

  &__bottom {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 4;
    min-width: 100%;
    width: 100%;
    padding: 16px;
    display: flex;
    justify-content: space-between;
  }

  &__pagination {
    border: 1px solid var(--blue-100);
    border-radius: 500px;
    padding: 12px 40px;

    &.swiper-pagination-fraction {
      width: fit-content;
    }
  }

  &__btns {
    display: flex;
    margin-left: auto;
  }

  &__btn-prev,
  &__btn-next {
    background-color: var(--white);
    border: 1px solid var(--grey-100);
    border-radius: 50%;
    padding: 12px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
      width: 8px;
      height: 7px;
    }

    &.swiper-button-disabled {
      background-color: var(--blue-100);
      cursor: not-allowed;

      svg {
        color: var(--blue-200);
      }
    }
  }

  &__btn-prev {
    transform: rotate(90deg);
  }
  &__btn-next {
    transform: rotate(-90deg);
  }
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-main-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.swiper-thumbs {
  height: 100%;
}

.slider-thumb-image {
  width: 100%;
  height: auto;
  opacity: 0.5;
  cursor: pointer;
}

.swiper-slide-thumb-active .slider-thumb-image {
  opacity: 1;
}

.swiper-pagination-total,
.swiper-pagination-current {
  font-weight: 500;
  font-size: 14px;
}
</style>
