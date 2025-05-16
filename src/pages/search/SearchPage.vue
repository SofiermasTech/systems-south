<template>
  <div class="search-page container catalog">
    <IntroPages title="Результат поиска" class="catalog__intro" />
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
    </div>
  </div>
</template>

<script>
import { useCatalogStore } from '@/shared/stores/catalog'
import IntroPages from '@widgets/intro-pages/IntroPages.vue'
import CatalogFilters from '@/features/catalog-filters/CatalogFilters.vue'
import CatalogSortPanel from '@/features/catalog-filters/CatalogSortPanel.vue'
import CatalogSortView from '@/features/catalog-filters/CatalogSortView.vue'
import ProductCard from '@/entities/product/ProductCard.vue'

export default {
  name: 'SearchPage',
  components: {
    IntroPages,
    CatalogFilters,
    CatalogSortPanel,
    CatalogSortView,
    ProductCard,
  },
  data() {
    return {
      catalogStore: null,
      sortType: 'cheap-first',
      appliedFilters: {
        brands: [], // Храним применённые фильтры
      },
      viewMode: localStorage.getItem('viewMode') || 'vertical',
    }
  },
  created() {
    this.catalogStore = useCatalogStore()
    this.catalogStore.loadProducts()
  },
  computed: {
    searchQuery() {
      return this.$route.query.query || ''
    },
    filteredProducts() {
      const query = this.searchQuery.toLowerCase().trim()
      if (!query || !this.catalogStore) return this.catalogStore?.getProducts || []
      return this.catalogStore.getProducts.filter((product) =>
        product.name.toLowerCase().includes(query),
      )
    },
  },
  methods: {
    handleSortChange(sortType) {
      this.sortType = sortType
    },
    handleApplyFilters(filters) {
      this.appliedFilters.brands = filters.brands
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

<style></style>
