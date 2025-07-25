<template>
  <article v-if="!isHorizontal" class="product-card card-vertical" @click="goToProduct">
    <div class="product-card__top">
      <div class="product-card__top-info">
        <StockStatus :stock="product.stock" />
        <p class="product-card__top-info-article article-number">Арт: {{ product.article }}</p>
      </div>
      <FavoriteButton :product="product" @click.stop />
    </div>
    <div class="product-card__images" :class="{ 'is-mobile': isMobile }">
      <!-- <div class="product-card__images-wrapper"> -->
      <!-- <div class="product-card__image-item"> -->
      <swiper
        ref="imageSwiper"
        v-bind="swiperOptions"
        @swiper="onSwiper"
        @slide-change="updatePagination"
      >
        <swiper-slide
          v-for="(image, index) in product.images"
          :key="index"
          class="product-card__image-item"
          @mouseenter="handleHover(index)"
        >
          <div class="product-card__img">
            <img :src="image" :alt="product.name" width="376" height="234" loading="lazy" />
          </div>
        </swiper-slide>
      </swiper>
      <!-- </div> -->
      <!-- </div> -->
      <ul class="product-card__pagination-list" v-if="product.images?.length > 1">
        <li
          class="product-card__pagination-item"
          v-for="(image, index) in product.images"
          :key="index"
          :class="{ 'active-item': activeSlide === index }"
          @mouseenter="handleHover(index)"
        ></li>
      </ul>
    </div>
    <div class="product-card__text">
      <h3>{{ product.brand }}</h3>
      <p>{{ product.name }}</p>
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
    <div class="product-card__images" :class="{ 'is-mobile': isMobile }">
      <!-- <div class="product-card__images-wrapper"> -->
      <!-- <div class="product-card__image-item"> -->
      <swiper
        ref="imageSwiper"
        v-bind="swiperOptions"
        @swiper="onSwiper"
        @slide-change="updatePagination"
      >
        <swiper-slide
          v-for="(image, index) in product.images"
          :key="index"
          class="product-card__image-item"
          @mouseenter="handleHover(index)"
        >
          <div class="product-card__img">
            <img :src="image" :alt="product.name" width="376" height="234" loading="lazy" />
          </div>
        </swiper-slide>
      </swiper>
      <!-- </div> -->
      <!-- </div> -->
      <ul class="product-card__pagination-list" v-if="product.images?.length > 1">
        <li
          class="product-card__pagination-item"
          v-for="(image, index) in product.images"
          :key="index"
          :class="{ 'active-item': activeSlide === index }"
          @mouseenter="handleHover(index)"
        ></li>
      </ul>
    </div>
    <div class="product-card__info">
      <div class="product-card__top-info">
        <StockStatus :stock="product.stock" />
        <p class="product-card__top-info-article article-number">Арт: {{ product.article }}</p>
      </div>
      <div class="product-card__text">
        <h3>{{ product.brand }}</h3>
        <p>{{ product.name }}</p>
      </div>
      <ul class="product-card__list">
        <li class="product-card__list-item">
          <p>Тип товара: <span>Пульт</span></p>
        </li>
        <li class="product-card__list-item">
          <p>Цвет покрытия: <span>Чёрный</span></p>
        </li>
        <li class="product-card__list-item">
          <p>Материал корпуса: <span>Пластик</span></p>
        </li>
        <li class="product-card__list-item">
          <p>Способ монтажа: <span>Накладной</span></p>
        </li>
      </ul>
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
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import { useCatalogStore } from '@/shared/stores/catalog.js'
import { useCartStore } from '@/shared/stores/cart.js'
import FavoriteButton from '@/entities/product/FavoriteButton.vue'
import ProductQuantity from '@widgets/product-quantity/ProductQuantity.vue'

export default {
  name: 'ProductCard',
  components: {
    Swiper,
    SwiperSlide,
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
  data() {
    return {
      swiper: null,
      activeSlide: 0,
      isMobile: window.innerWidth <= 768,
      swiperOptions: {
        modules: [Pagination],
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        pagination: false,
        allowTouchMove: window.innerWidth <= 768,
      },
    }
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
  watch: {
    shouldLoop(newValue) {
      if (this.swiper) {
        this.swiper.params.loop = newValue
        this.swiper.loopDestroy()
        if (newValue) {
          this.swiper.loopCreate()
        }
        this.swiper.update()
      }
    },
    isMobile(newValue) {
      if (this.swiper) {
        this.swiper.params.allowTouchMove = newValue
        this.swiper.update()
      }
    },
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper
      this.swiper.params.loop = this.shouldLoop
      this.swiper.params.allowTouchMove = this.isMobile
      if (this.shouldLoop) {
        this.swiper.loopCreate()
      }
      this.updatePagination()
    },
    updatePagination() {
      if (this.swiper) {
        this.activeSlide = this.swiper.realIndex
      }
    },
    handleHover(index) {
      console.log('handleHover triggered', index, 'isMobile:', this.isMobile)
      if (!this.isMobile && this.swiper) {
        if (this.shouldLoop) {
          this.swiper.slideToLoop(index)
        } else {
          this.swiper.slideTo(index)
        }
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768
    },
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
  created() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.product-card {
  //  max-width: 374px;
  max-width: clamp(214px, 22.5vw, 423px);
  // height: 405px;
  height: 100%;
  width: 100%;
  padding-bottom: clamp(14px, 1vw, 20px);
  background-color: var(--white);
  border: 1px solid var(--blue-100);
  border-radius: var(--br-block);
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  transition: all 0.3s ease;

  @include mobile {
    padding-bottom: 20px;
  }

  &__top {
    // max-width: 344px;
    width: 100%;
    padding: clamp(14px, 1vw, 20px);
    display: flex;
    justify-content: space-between;
    position: absolute;
    z-index: 11;

    @include mobile {
      padding: 20px;
    }
  }

  &__top-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__top-info-article {
  }

  .swiper-wrapper {
    display: flex;
    align-items: stretch;
    box-sizing: border-box;
  }

  .swiper-slide {
    width: auto;
    height: auto;
  }

  &__images {
    margin-top: auto;
    margin-bottom: 12px;
    // position: absolute;
    // top: 0;
    // left: 0;
    width: 100%;
    position: relative;
    // z-index: 20;
    &:not(.is-mobile) {
      cursor: pointer;

      .swiper {
        touch-action: none;
      }

      .product-card__image-item,
      .product-card__pagination-item {
        pointer-events: auto;
      }
    }

    &.is-mobile {
      cursor: grab;

      .product-card__image-item,
      .product-card__pagination-item {
        pointer-events: none;
      }
    }
  }

  &__images-wrapper {
  }

  &__image-item {
  }

  &__img {
    max-height: clamp(144px, 14vw, 280px);
    height: 100%;
    display: flex;
    align-items: center;

    @include mobile {
      max-height: 200px;
    }

    img {
      max-height: 100%;
      height: 100%;
      width: 100%;
      object-fit: contain;
      object-position: center;
      border-radius: 10px;
    }
  }

  &__pagination-list {
    display: flex;
    gap: 4px;
    align-items: center;
    position: absolute;
    // bottom: 20px;
    bottom: -20px;
    left: 50%;
    z-index: 11;
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
    // margin-top: auto;
    padding: 0 clamp(14px, 1vw, 20px);
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: pointer;
    // position: relative;
    // z-index: 9;

    h3 {
      margin: 0;
      font-weight: 600;
      @include fluid-text(16, 12);

      @include mobile {
        font-size: 14px;
      }
    }

    p {
      margin: 0;
      max-width: 95%;
      width: 100%;
      font-weight: 400;
      @include fluid-text(14, 10);

      @include mobile {
        font-size: 12px;
      }
    }
  }

  &__bottom {
    // margin-top: 10px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .product-quantity {
      max-width: max(140px, 45%);
      width: 100%;
    }

    .base-button {
      max-width: max(140px, 55%);
    }

    @media screen and (max-width: 1150px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    @include mobile {
      flex-direction: row;
    }
  }

  &__price {
    font-weight: 600;
    line-height: 110%;
    color: var(--blue);
    @include fluid-text(24, 16);

    @include mobile {
      font-size: 20px;
    }
  }

  &__btn-card {
  }

  &.card-horizontal {
    max-width: 100%;
    flex-direction: row;
    align-items: center;
    height: clamp(160px, 18vw, 290px);
    gap: 16px;
    padding: 0;

    .product-card__images {
      margin: auto 0;
      border-radius: 16px;
      width: clamp(190px, 15vw, 280px);
      height: clamp(130px, 13vw, 240px);
    }

    .product-card__img img {
      max-height: 240px;
    }

    .product-card__pagination-list {
      bottom: 20px;
    }

    .product-card__info {
      max-width: 52%;
      // height: 100%;
      padding-block: 0;
      display: flex;
      flex-direction: column;
      gap: 16px;

      @include tablet {
        gap: 12px;
      }
    }

    .product-card__top-info {
      flex-direction: row;
      gap: 40px;

      @include tablet {
        gap: 20px;
      }
    }

    .product-card__text {
      margin-top: 0;
      padding: 0;

      @include tablet {
        gap: 6px;
      }
    }

    .product-card__list {
      display: flex;
      flex-direction: column;
      gap: 6px;

      @include tablet-bottom {
        gap: 3px;
      }
    }

    .product-card__list-item {
      @include fluid-text(14, 10);
      color: var(--grey-200);

      span {
        font-weight: 600;
        color: var(--black);
      }
    }

    .product-card__right {
      margin-left: auto;
      height: 100%;
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

    .product-quantity {
      width: 136px;
    }
  }
}

.article-number {
  font-weight: 600;
  @include fluid-text(14, 10);
  color: var(--grey-200);
}
</style>
