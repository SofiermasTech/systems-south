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

    <CatalogFilters class="catalog__filters" />

    <div class="catalog__sort">
      <CatalogSortPanel />
      <CatalogSortView />
    </div>

    <div class="catalog__cards">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @toggle-favorite="handleToggleFavorite"
      />
    </div>
  </div>
</template>

<script>
import CatalogFilters from '@/components/CatalogPage/CatalogFilters.vue'
import CatalogSortPanel from '@/components/CatalogPage/CatalogSortPanel.vue'
import CatalogSortView from '@/components/CatalogPage/CatalogSortView.vue'

export default {
  components: {
    CatalogFilters,
    CatalogSortPanel,
    CatalogSortView,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleToggleFavorite(product) {
      this.$emit('toggle-favorite', product)
    },
  },
}
</script>
<style lang="scss">
.catalog {
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
