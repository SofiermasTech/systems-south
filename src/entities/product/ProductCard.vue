<template>
  <article v-if="!isHorizontal" class="product-card card-vertical" @click="goToProduct">
    <div class="product-card__top">
      <div class="product-card__top-info">
        <StockStatus :stock="product.isBestseller" />
        <p class="product-card__top-info-article article-number">Арт: {{ product.partNumber }}</p>
      </div>
      <FavoriteButton :product="product" @click.stop />
    </div>
    <div class="product-card__images" :class="{ 'is-mobile': isMobile }" ref="imageContainer">
      <swiper
        v-if="isMobile"
        ref="imageSwiper"
        v-bind="swiperOptions"
        @swiper="onSwiper"
        @slide-change="updatePagination"
        role="slider"
        :aria-label="`Product image slider with ${product.images?.length} images`"
        :aria-valuenow="activeSlide + 1"
        :aria-valuemax="product.images?.length"
      >
        <swiper-slide
          v-for="(image, index) in product.images"
          :key="index"
          class="product-card__img"
        >
          <img :src="image" :alt="product.name" width="376" height="234" loading="lazy" />
        </swiper-slide>
      </swiper>
      <div v-else-if="product.images?.length > 1" class="product-card__image-wrapper">
        <div
          class="product-card__image-item"
          v-for="(image, index) in product.images"
          :key="index"
          @mouseenter="updateCurrentImage(index)"
          @mouseleave="resetImage"
        >
          <div class="product-card__img" :class="{ active: currentImage === index }">
            <img :src="image" :alt="product.name" width="376" height="234" loading="lazy" />
          </div>
        </div>
      </div>

      <div v-else class="product-card__image-item">
        <div class="product-card__img">
          <img
            v-if="product.images?.length"
            :src="product.images[0]"
            :alt="product.name"
            width="376"
            height="234"
            loading="lazy"
          />
        </div>
      </div>
      <ul class="product-card__pagination-list" v-if="product.images?.length > 1">
        <li
          v-for="(image, index) in product.images"
          :key="index"
          class="product-card__pagination-item"
          :class="{ 'active-item': isMobile ? activeSlide === index : currentImage === index }"
          @click="selectSlide(index)"
          role="button"
          :aria-label="`Go to image ${index + 1}`"
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
    <div class="product-card__images" :class="{ 'is-mobile': isMobile }" ref="imageContainer">
      <swiper
        v-if="isMobile && product.images?.length > 1"
        ref="imageSwiper"
        v-bind="swiperOptions"
        @swiper="onSwiper"
        @slide-change="updatePagination"
        role="slider"
        :aria-label="`Product image slider with ${product.images?.length} images`"
        :aria-valuenow="activeSlide + 1"
        :aria-valuemax="product.images?.length"
      >
        <swiper-slide
          v-for="(image, index) in product.images"
          :key="index"
          class="product-card__img"
        >
          <img :src="image" :alt="product.name" width="376" height="234" loading="lazy" />
        </swiper-slide>
      </swiper>
      <div v-else-if="product.images?.length > 1" class="product-card__image-wrapper">
        <div
          class="product-card__image-item"
          v-for="(image, index) in product.images"
          :key="index"
          @mouseenter="updateCurrentImage(index)"
          @mouseleave="resetImage"
        >
          <div class="product-card__img" :class="{ active: currentImage === index }">
            <img :src="image" :alt="product.name" width="376" height="234" loading="lazy" />
          </div>
        </div>
      </div>
      <div v-else class="product-card__img">
        <img
          v-if="product.images?.length"
          :src="product.images[0]"
          :alt="product.name"
          width="376"
          height="234"
          loading="lazy"
        />
      </div>
      <ul class="product-card__pagination-list" v-if="product.images?.length > 1">
        <li
          v-for="(image, index) in product.images"
          :key="index"
          class="product-card__pagination-item"
          :class="{ 'active-item': isMobile ? activeSlide === index : currentImage === index }"
          @click="selectSlide(index)"
          role="button"
          :aria-label="`Go to image ${index + 1}`"
        ></li>
      </ul>
    </div>
    <div class="product-card__info">
      <div class="product-card__top-info">
        <StockStatus :stock="product.isBestseller" />
        <p class="product-card__top-info-article article-number">Арт: {{ product.partNumber }}</p>
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
// import { Pagination } from 'swiper/modules'
import 'swiper/css'
// import 'swiper/css/pagination'
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
      type: [Number, String],
      required: true,
    },
    isHorizontal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isMobile: window.innerWidth <= 1024,
      swiper: null,
      activeSlide: 0,
      currentImage: 0,
      swiperOptions: {
        // modules: [Pagination],
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        // pagination: {
        //   clickable: true,
        // },
        allowTouchMove: true,
      },
    }
  },
  computed: {
    product() {
      const catalogStore = useCatalogStore()
      console.log(this.productId)
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
    isMobile(newValue) {
      if (this.swiper) {
        this.swiper.destroy(true, true)
        this.swiper = null
      }
      this.activeSlide = 0
      this.currentImage = 0
      this.$nextTick(() => {
        if (newValue && this.$refs.imageSwiper) {
          this.onSwiper(this.$refs.imageSwiper.swiper)
        }
      })
    },
    product() {
      this.$nextTick(() => {
        if (this.swiper) {
          this.swiper.update()
        }
        this.currentImage = 0
        this.activeSlide = 0
      })
    },
  },
  methods: {
    onSwiper(swiper) {
      if (this.isMobile) {
        this.swiper = swiper
        this.updatePagination()
      }
    },
    updatePagination() {
      if (this.swiper) {
        this.activeSlide = this.swiper.realIndex
        this.currentImage = this.activeSlide // Синхронизация с hover
      }
    },
    updateCurrentImage(index) {
      if (!this.isMobile) {
        this.currentImage = index
      }
    },
    resetImage() {
      if (!this.isMobile) {
        this.currentImage = 0
      }
    },
    selectSlide(index) {
      if (this.isMobile && this.swiper) {
        this.swiper.slideToLoop(index)
      } else {
        this.updateCurrentImage(index)
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 1024
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
    if (this.swiper) {
      this.swiper.destroy(true, true)
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.product-card {
  max-width: clamp(214px, 22.5vw, 423px);
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

  &__images {
    margin-top: auto;
    margin-bottom: 12px;
    width: 100%;
    position: relative;
    height: clamp(144px, 14vw, 280px);

    &.is-mobile {
      cursor: grab;
    }

    @include mobile {
      height: 200px;
    }
  }

  &__image-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;

    @media (max-width: 1024px) {
      display: none;
    }
  }

  &__image-item {
    flex-grow: 1;
    cursor: pointer;

    &:first-child .product-card__img {
      opacity: 1;
    }

    &:hover .product-card__img {
      opacity: 1;
    }

    @media (max-width: 1024px) {
      display: none;
    }
  }

  &__img {
    max-height: clamp(194px, 14vw, 280px);
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s ease;

    &.active {
      opacity: 1;
    }

    @media (max-width: 1024px) {
      position: static;
      transform: none;
      opacity: 1;
      pointer-events: auto;
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

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__pagination-list {
    display: flex;
    gap: 4px;
    align-items: center;
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 11;
  }

  &__pagination-item {
    width: 6px;
    height: 6px;
    background-color: var(--blue-100);
    border-radius: 50%;
    cursor: pointer;

    &.active-item {
      background-color: var(--blue-200);
    }
  }

  &__text {
    padding: 0 clamp(14px, 1vw, 20px);
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: pointer;

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

    .product-card__img {
      max-height: 240px;

      img {
        max-height: 240px;
      }
    }

    .product-card__pagination-list {
      bottom: 20px;
    }

    .product-card__info {
      max-width: 52%;
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

  @media (prefers-reduced-motion: reduce) {
    .swiper-slide,
    .product-card__img {
      transition: none;
    }
  }
}

.article-number {
  font-weight: 600;
  @include fluid-text(14, 10);
  color: var(--grey-200);
}
</style>
