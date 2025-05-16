<template>
  <div class="catalog container">
    <IntroPages class="catalog__intro" />
    <div class="catalog__categories">
      <p class="catalog__categories-title">Категории:</p>
      <ul class="catalog__categories-list">
        <li class="catalog__categories-item active">
          <base-button>
            <span>Категория 1</span>
          </base-button>
        </li>
        <li class="catalog__categories-item">
          <base-button>
            <span>Категория 2</span>
          </base-button>
        </li>
        <li class="catalog__categories-item">
          <base-button>
            <span>Категория 3</span>
          </base-button>
        </li>
      </ul>
    </div>

    <CatalogFilters class="catalog__filters" @apply-filters="handleApplyFilters" />

    <div class="catalog__sort">
      <CatalogSortPanel @sort-change="handleSortChange" />
      <CatalogSortView :view-mode="viewMode" @view-change="handleViewChange" />
    </div>

    <div class="catalog__cards" :class="{ horizontal: viewMode === 'horizontal' }">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product-id="product.id"
        :is-horizontal="viewMode === 'horizontal'"
        @toggle-favorite="handleToggleFavorite"
      />
      <p v-if="filteredProducts.length === 0">Нет результатов по запросу</p>
    </div>
  </div>
  <CallbackSection />
</template>

<script>
import { useCatalogStore } from '@/shared/stores/catalog'
import CatalogFilters from '@/features/catalog-filters/CatalogFilters.vue'
import CatalogSortPanel from '@/features/catalog-filters/CatalogSortPanel.vue'
import CatalogSortView from '@/features/catalog-filters/CatalogSortView.vue'
import ProductCard from '@/entities/product/ProductCard.vue'
import IntroPages from '@widgets/intro-pages/IntroPages.vue'
import CallbackSection from '@/widgets/callbackSection/CallbackSection.vue'

export default {
  components: {
    IntroPages,
    CatalogFilters,
    CatalogSortPanel,
    CatalogSortView,
    ProductCard,
    CallbackSection,
  },
  data() {
    return {
      catalogStore: null,
      sortType: 'cheap-first',
      appliedFilters: {
        brands: [],
        priceRange: [null, null],
      },
      viewMode: localStorage.getItem('viewMode') || 'vertical',
    }
  },
  computed: {
    products() {
      const catalogStore = useCatalogStore()
      return catalogStore.getProducts
    },
    sortedProducts() {
      // Копируем массив, чтобы не мутировать оригинальный
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
      // Фильтрация по брендам
      if (this.appliedFilters.brands.length > 0) {
        products = products.filter((product) => this.appliedFilters.brands.includes(product.brand))
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
  mounted() {
    const catalogStore = useCatalogStore()
    catalogStore.loadProducts()
  },
  methods: {
    handleSortChange(sortType) {
      this.sortType = sortType
    },
    handleApplyFilters(filters) {
      this.appliedFilters = {
        brands: filters.brands || [],
        priceRange: filters.priceRange || [null, null],
      }
    },
    handleToggleFavorite(product) {
      this.$emit('toggle-favorite', product)
    },
    handleViewChange(mode) {
      this.viewMode = mode
    },
  },
  watch: {
    viewMode(newValue) {
      localStorage.setItem('viewMode', newValue)
    },
  },
}
</script>
<style lang="scss">
.catalog {
  margin-bottom: var(--section-offset);
  display: grid;
  grid-template-columns: 350px 1fr;
  row-gap: 20px;
  column-gap: 32px;
  grid-template-areas:
    'intro intro'
    'cat cat'
    'filters sort'
    'filters cards';

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
    font-size: 16px;
    color: var(--grey-200);
  }

  &__categories-list {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  &__categories-item {
    .base-button {
      background-color: var(--blue-100);
      color: var(--black);
    }

    &.active {
      .base-button {
        background-color: var(--blue);
        color: var(--white);
      }
    }
  }

  &__filters {
    grid-area: filters;
  }

  &__sort {
    max-height: 60px;
    height: fit-content;
    border: 1px solid var(--blue-100);
    border-radius: 12px;
    padding-block: 8px;
    padding-inline: 24px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;

    &.horizontal {
      grid-template-columns: 1fr;
    }
  }
}
</style>
