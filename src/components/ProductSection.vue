<template>
  <section class="product">
    <div class="container">
      <div class="product__body">
        <div class="product__body-top">
          <h2 class="product__title h2">{{ title }}</h2>
          <SliderArrow />
        </div>
        <div class="product__body-content">
          <div class="product__cards">
            <ProductCard v-for="product in products" :key="product.id" :product="product" @toggle-favorite="handleToggleFavorite" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SliderArrow from '@/components/common/SliderArrow.vue'
import ProductCard from '@/components/common/ProductCard.vue'

export default {
  name: 'ProductSection',
  components: {
    SliderArrow,
    ProductCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    handleToggleFavorite(product) {
      this.$emit("toggle-favorite", product);
    },
  },
}
</script>

<style lang="scss">
.product {
  padding-block: 70px 80px;
  background-color: var(--blue-0);

  &__body {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__body-top {
    display: flex;
    justify-content: space-between;
  }

  &__title {
  }

  &__body-content {
    width: 100%;
    overflow: hidden;
  }

  &__cards {
    display: flex;
    gap: 8px;
  }
}
</style>
