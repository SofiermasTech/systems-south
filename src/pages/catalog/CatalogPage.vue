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
      <CatalogSortView />
    </div>

    <div class="catalog__cards">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product-id="product.id"
        @toggle-favorite="handleToggleFavorite"
      />
    </div>
  </div>
</template>

<script>
import { useCatalogStore } from '@/shared/stores/catalog'
import CatalogFilters from '@/features/catalog-filters/CatalogFilters.vue'
import CatalogSortPanel from '@/features/catalog-filters/CatalogSortPanel.vue'
import CatalogSortView from '@/features/catalog-filters/CatalogSortView.vue'
import ProductCard from '@/entities/product/ProductCard.vue'
import IntroPages from '@widgets/intro-pages/IntroPages.vue'

export default {
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
        return products // Без сортировки
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
      this.appliedFilters.brands = filters.brands
    },
    handleToggleFavorite(product) {
      this.$emit('toggle-favorite', product)
    },
  },
}


</script>
<style lang="scss">
.catalog {
  margin-bottom: var(--section-offset);
  display: grid;
  grid-template-columns: 380px 1fr;
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
  }
}
</style>
