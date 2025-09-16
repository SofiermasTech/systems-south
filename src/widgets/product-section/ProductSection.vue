<template>
  <section class="product">
    <div class="container">
      <div class="product__body">
        <div class="product__body-top">
          <h2 class="product__title h2">{{ title }}</h2>
          <SliderArrow
            :swiper="productSwiper"
            :is-beginning="productIsBeginning"
            :is-end="productIsEnd"
          />
        </div>
        <div class="product__body-content">
          <BaseSlider
            :slides="filteredProducts"
            :options="productOptions"
            @swiper-ready="onProductsSwiperReady"
            @navigation-update="onProductsNavigationUpdate"
          >
            <template #default="{ item }">
              <ProductCard :product-id="item.id" @toggle-favorite="handleToggleFavorite" />
            </template>
          </BaseSlider>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseSlider from '@/shared/ui/BaseSlider.vue'
import SliderArrow from '@widgets/slider-arrow/SliderArrow.vue'
import ProductCard from '@/entities/product/ProductCard.vue'
import { useCatalogStore } from '@/shared/stores/catalog'

export default {
  name: 'ProductSection',
  components: {
    BaseSlider,
    SliderArrow,
    ProductCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    filterType: {
      type: String,
      required: true,
      validator: (value) => ['new', 'best', 'recommended'].includes(value),
    },
  },
  data() {
    return {
      catalogStore: null,
      productSwiper: null,
      productIsBeginning: true,
      productIsEnd: false,
      productOptions: {
        loop: false,
        slidesPerView: 4,
        spaceBetween: 8,
        autoplay: false,
        pagination: false,
        breakpoints: {
          320: {
            slidesPerView: 1.2,
          },
          480: {
            slidesPerView: 1.5,
          },

          600: {
            slidesPerView: 2.6,
          },
          760: {
            slidesPerView: 3.2,
          },
          995: {
            slidesPerView: 4,
          },
        },
      },
    }
  },
  computed: {
    products() {
      return this.catalogStore.getProducts
    },
    filteredProducts() {
      return this.products.filter((product) => product[this.filterType])
    },
  },
  methods: {
    handleToggleFavorite(product) {
      this.$emit('toggle-favorite', product)
    },
    onProductsSwiperReady(swiper) {
      this.productSwiper = swiper
      this.productIsBeginning = swiper.isBeginning
      this.productIsEnd = swiper.isEnd
    },
    onProductsNavigationUpdate({ isBeginning, isEnd }) {
      this.productIsBeginning = isBeginning
      this.productIsEnd = isEnd
    },
  },
  created() {
    this.catalogStore = useCatalogStore()
    this.catalogStore.loadProducts()
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';
.product {
  padding-block: 70px 80px;
  background-color: var(--blue-0);

  &__body {
    display: flex;
    flex-direction: column;
    gap: 32px;

   .base-slider>.swiper {
      @include tablet-bottom {
        padding-inline: 20px;
      }
    }
  }

  &__body-top {
    display: flex;
    justify-content: space-between;

    @include tablet-bottom {
      padding-inline: var(--container-padding-y);
    }
  }

  &__title {
  }

  &__body-content {
    width: 100%;
    overflow: hidden;

    .product-card {
      @media screen and (max-width: 995px) {
        max-width: max(420px, 80%);
        // width: 280px;
      }
    }
  }

  &__cards {
    display: flex;
    gap: 8px;
  }

  .container {
    @include tablet-bottom {
      max-width: 100%;
      padding-inline: 0;
      margin: 0;
    }
  }
}
</style>
