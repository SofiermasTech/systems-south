<template>
  <div class="catalog">
    <IntroPages class="catalog__intro" :title="title" />
    <slot name="categories" v-if="filteredProducts.length > 0">
      <div class="catalog__categories container" v-if="showCategories">
        <p class="catalog__categories-title">{{ subtitle }}</p>
        <ul class="catalog__categories-list">
          <li
            class="catalog__categories-item"
            v-for="category in categories"
            :key="category.slug"
            :class="{ active: activeCategory === category.slug }"
          >
            <RouterLink
              class="base-button"
              :to="category.to"
              :class="{ 'base-button--active': activeCategory === category.slug }"
            >
              <span>{{ category.name }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </slot>

    <div class="catalog__content container">
      <CatalogFilters
        v-if="filteredProducts.length > 0"
        class="catalog__filters"
        @apply-filters="handleApplyFilters"
        :products="products"
        :category="category"
        :subcategory="subcategory"
      />
      <div class="catalog__sort" v-if="filteredProducts.length > 0">
        <CatalogSortPanel @sort-change="handleSortChange" />
        <CatalogSortView :view-mode="viewMode" @view-change="handleViewChange" />
      </div>
      <div
        class="catalog__cards"
        :class="{ horizontal: viewMode === 'horizontal' }"
        v-if="filteredProducts.length > 0"
      >
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product-id="product.id"
          :is-horizontal="viewMode === 'horizontal'"
          @toggle-favorite="handleToggleFavorite"
        />
        <!-- <p v-if="filteredProducts.length === 0">Нет результатов по запросу</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import CatalogFilters from '@/features/catalog-filters/CatalogFilters.vue'
import CatalogSortPanel from '@/features/catalog-filters/CatalogSortPanel.vue'
import CatalogSortView from '@/features/catalog-filters/CatalogSortView.vue'
import ProductCard from '@/entities/product/ProductCard.vue'
import IntroPages from '@widgets/intro-pages/IntroPages.vue'

export default {
  name: 'BaseCatalogPage',
  components: {
    IntroPages,
    CatalogFilters,
    CatalogSortPanel,
    CatalogSortView,
    ProductCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      default: () => [],
    },
    activeCategory: {
      type: String,
      default: null,
    },
    showCategories: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      default: null,
    },
    subcategory: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      sortType: 'cheap-first',
      appliedFilters: {
        brands: [],
        subcategories: [],
        priceRange: [null, null],
      },
      viewMode: localStorage.getItem('viewMode') || 'vertical',
    }
  },
  computed: {
    sortedProducts() {
      const products = [...this.products]

      if (!this.sortType) {
        return products
      }

      if (this.sortType === 'cheap-first') {
        return products.sort((a, b) => a.price - b.price)
      }

      if (this.sortType === 'expensive-first') {
        return products.sort((a, b) => b.price - a.price)
      }

      if (this.sortType === 'in-stock') {
        return products.sort((a, b) => (a.stock === b.stock ? 0 : a.stock ? -1 : 1))
      }

      return products
    },
    filteredProducts() {
      let products = [...this.sortedProducts]

      if (this.appliedFilters.brands.length > 0) {
        products = products.filter((product) => this.appliedFilters.brands.includes(product.brand))
      }

      if (this.appliedFilters.subcategories.length > 0) {
        products = products.filter((product) =>
          this.appliedFilters.subcategories.includes(product.subcategory),
        )
      }

      if (
        this.appliedFilters.priceRange &&
        (this.appliedFilters.priceRange[0] !== null || this.appliedFilters.priceRange[1] !== null)
      ) {
        products = products.filter((product) => {
          const price = product.price
          const min = this.appliedFilters.priceRange[0]
          const max = this.appliedFilters.priceRange[1]
          return (min === null || price >= min) && (max === null || price <= max)
        })
      }

      return products
    },
  },
  watch: {
    viewMode(newValue) {
      localStorage.setItem('viewMode', newValue)
    },
    $route(to, from) {
      if (to.path !== from.path) {
        this.appliedFilters = {
          brands: [],
          subcategories: [],
          priceRange: [null, null],
        }
      }
    },
  },
  methods: {
    handleSortChange(sortType) {
      this.sortType = sortType
    },
    handleApplyFilters(filters) {
      this.appliedFilters = {
        brands: filters.brands || [],
        subcategories: filters.subcategories || [],
        priceRange: filters.priceRange || [null, null],
      }
    },
    handleToggleFavorite(product) {
      this.$emit('toggle-favorite', product)
    },
    handleViewChange(mode) {
      this.viewMode = mode
      localStorage.setItem('viewMode', mode)
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.catalog {
  min-height: 60vh;
  margin-bottom: var(--section-offset);
  // display: grid;
  // grid-template-columns: clamp(266px, 21vw, 395px) 1fr;
  // row-gap: 20px;
  // column-gap: 32px;
  // grid-template-areas:
  //   'intro intro'
  //   'cat cat'
  //   'filters sort'
  //   'filters cards';

  display: flex;
  flex-direction: column;
  gap: clamp(28px, 2.5vw, 50px);

  &__intro {
    grid-area: intro;
    margin-bottom: 40px;
  }

  &__categories {
    grid-area: cat;
    display: flex;
    align-items: center;
    gap: 32px;
  }

  &__categories-title {
    font-weight: 500;
    @include fluid-text(16, 12);
    color: var(--grey-200);
  }

  &__categories-list {
    display: flex;
    gap: clamp(8px, 0.6vw, 16px);
    align-items: center;
  }

  &__categories-item {
    .base-button {
      background-color: var(--blue-100);
      color: var(--black);
      text-decoration: none;
    }

    &.active {
      .base-button {
        background-color: var(--blue);
        color: var(--white);
      }
    }
  }

  &__content {
    display: grid;
    grid-template-columns: clamp(266px, 21vw, 395px) 1fr;
    grid-template-rows: auto 1fr;
    row-gap: clamp(10px, 1.1vw, 24px);
    column-gap: clamp(20px, 2vw, 36px);
    grid-template-areas:
      'filters sort'
      'filters cards';

    @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr;
      grid-template-areas: none;
    }
  }

  &__filters {
    grid-area: filters;

    @media screen and (max-width: 1200px) {
      display: none;
    }
  }

  &__sort {
    max-height: 60px;
    height: fit-content;
    border: 1px solid var(--blue-100);
    border-radius: 12px;
    padding-block: 8px;
    padding-inline: 16px clamp(8px, 1.2vw, 24px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: clamp(350px, 25vw, 460px);
    gap: 8px;

    @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media screen and (max-width: 920px) {
      grid-template-columns: repeat(3, 1fr);

      .card-vertical {
        max-width: clamp(200px, 30.5vw, 280px);
      }
    }

    @include mobile {
      display: flex;
      flex-direction: column;
      // align-items: center;

      .card-vertical {
        max-width: clamp(260px, calc(100vw - (var(--container-padding-y) * 2)), 500px);
        width: 100%;
        margin: 0 auto;
      }
    }

    &.horizontal {
      grid-template-columns: 1fr;
    }
  }
}
</style>
