<template>
  <BaseCatalogPage
    title="Результат поиска"
    subtitle="Найдено в категориях:"
    :products="filteredSearchProducts"
    :categories="categories"
    :activeCategory="activeCategory"
    :category="category"
    :subcategory="null"
    @toggle-favorite="handleToggleFavorite"
    @apply-filters="handleApplyFilters"
  >
  </BaseCatalogPage>
  <CallbackSection />
</template>

<script>
import { useCatalogStore } from '@/shared/stores/catalog'
import BaseCatalogPage from '@/shared/layouts/BaseCatalogPage.vue'
import CallbackSection from '@/widgets/callback-section/CallbackSection.vue'
import { categoryNames } from '@/shared/config/categoryNames.js'

export default {
  name: 'SearchPage',
  components: {
    BaseCatalogPage,
    CallbackSection,
  },
  data() {
    return {
      catalogStore: useCatalogStore(),
      activeCategory: null,
      appliedFilters: {
        brands: [],
        subcategories: [],
        priceRange: [null, null],
      },
    }
  },
  computed: {
    searchQuery() {
      return this.$route.query.query || ''
    },
    category() {
      return this.$route.params.category || null
    },
    searchProducts() {
      const query = this.searchQuery.toLowerCase().trim()
      if (!query) return this.catalogStore?.getProducts || []
      return this.catalogStore.getProducts.filter((product) =>
        product.name.toLowerCase().includes(query),
      )
    },
    categories() {
      let products = this.searchProducts
      if (this.appliedFilters.subcategories.length > 0) {
        // Ограничиваем категории, если выбраны подкатегории
        products = products.filter((product) =>
          this.appliedFilters.subcategories.includes(product.subcategory),
        )
      }
      const searchCategories = [...new Set(products.map((product) => product.category))]
      return searchCategories.map((category) => ({
        slug: category,
        name: categoryNames[category] || category,
        to: `/search/${category}?query=${encodeURIComponent(this.searchQuery)}`,
      }))
    },
    filteredSearchProducts() {
      let products = [...this.searchProducts]

      if (this.activeCategory) {
        products = products.filter((product) => product.category === this.activeCategory)
      }

      // Применяем фильтры из BaseCatalogPage
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
  async created() {
    await this.catalogStore.loadProducts()
    if (this.category) {
      this.activeCategory = this.category
    }
  },
  methods: {
    handleToggleFavorite(product) {
      this.$emit('toggle-favorite', product)
    },
    handleApplyFilters(filters) {
      this.appliedFilters = {
        brands: filters.brands || [],
        subcategories: filters.subcategories || [],
        priceRange: filters.priceRange || [null, null],
      }
      // Если выбраны подкатегории, обновляем activeCategory
      if (filters.subcategories?.length > 0) {
        const subcategory = filters.subcategories[0]
        const product = this.searchProducts.find((p) => p.subcategory === subcategory)
        this.activeCategory = product ? product.category : null
      } else {
        this.activeCategory = this.category
      }
    },
  },
  watch: {
    $route(to) {
      this.activeCategory = to.params.category || null
      if (to.query.query !== this.searchQuery) {
        this.appliedFilters = {
          brands: [],
          subcategories: [],
          priceRange: [null, null],
        }
      }
    },
  },
}
</script>

<style lang="scss"></style>
