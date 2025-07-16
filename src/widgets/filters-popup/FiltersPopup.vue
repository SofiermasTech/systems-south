<template>
  <div class="filters-popup">
    <div class="filters-popup__overlay" @click="closePopup">
      <div class="filters-popup__body container">
        <CatalogFilters
          @click.stop
          :products="products"
          :category="category"
          :subcategory="subcategory"
          @apply-filters="$emit('apply-filters', $event)"
          @close="closePopup"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CatalogFilters from '@/features/catalog-filters/CatalogFilters.vue'
import { usePopupStore } from '@/shared/stores/popup.js'
import { useCatalogStore } from '@/shared/stores/catalog.js'

export default {
  name: 'FiltersPopup',
  components: {
    CatalogFilters,
  },
  props: {
    category: { type: String, default: null },
    subcategory: { type: String, default: null },
    products: { type: Array, default: () => [] },
  },
  emits: ['apply-filters', 'close'],
  data() {
    return {
      popupStore: usePopupStore(),
      catalogStore: useCatalogStore(),
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
  },
  mounted() {
    console.log('FiltersPopup props:', {
      category: this.category,
      subcategory: this.subcategory,
      products: this.products,
    })
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.filters-popup {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 150;

  &__overlay {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.5);
  }

  &__body {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .aside-filters {
    background-color: var(--white);
    width: fit-content;
    padding: 10px;
    border-radius: 20px;

    @include mobile-bottom {
      width: 100%;
    }
  }
}
</style>
