<template>
  <BaseCatalogPage
    :title="activeCategoryName"
    subtitle="Категории:"
    :products="products"
    :categories="categories"
    :activeCategory="activeCategory"
    :category="category"
    :subcategory="subcategory"
    @toggle-favorite="handleToggleFavorite"
  />
  <CallbackSection />
</template>

<script>
import { useCatalogStore } from '@/shared/stores/catalog'
import BaseCatalogPage from '@/shared/layouts/BaseCatalogPage.vue'
import CallbackSection from '@/widgets/callback-section/CallbackSection.vue'
import { categoryNames } from '@/shared/config/categoryNames.js'

export default {
  components: {
    BaseCatalogPage,
    CallbackSection,
  },
  props: {
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
      catalogStore: null,
    }
  },
  computed: {
    categories() {
      const catalogStore = useCatalogStore()
      return catalogStore.getCategories.map((category) => ({
        slug: category,
        name: categoryNames[category] || category,
        to: `/catalog/${category}`,
      }))
    },
    subcategories() {
      return this.activeCategory
        ? this.catalogStore.getSubcategoriesByCategory(this.activeCategory).map((subcategory) => ({
            slug: subcategory,
            name: categoryNames[subcategory] || subcategory,
          }))
        : []
    },
    activeCategory() {
      return this.category || null
    },
    activeCategoryName() {
      if (this.subcategory) {
        return categoryNames[this.subcategory] || this.subcategory
      }
      if (this.category) {
        return categoryNames[this.category] || this.category
      }
      return 'Каталог'
    },
    products() {
      const catalogStore = useCatalogStore()
      if (this.subcategory) {
        const products = catalogStore.getProductsByCategoryAndSubcategory(
          this.category,
          this.subcategory,
        )
        return products
      }
      if (this.category) {
        return catalogStore.getProductsByCategory(this.category)
      }
      return catalogStore.getProducts
    },
  },
  watch: {
    viewMode(newValue) {
      localStorage.setItem('viewMode', newValue)
    },
    $route(to, from) {
      // Сбрасываем фильтры и сортировку при смене маршрута
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
    handleToggleFavorite(product) {
      this.$emit('toggle-favorite', product)
    },
  },
  mounted() {
    this.catalogStore = useCatalogStore()
    this.catalogStore.loadProducts()
  },
}
</script>

<style lang="scss">
// .catalog {
//   margin-bottom: var(--section-offset);
//   display: grid;
//   grid-template-columns: 350px 1fr;
//   row-gap: 20px;
//   column-gap: 32px;
//   grid-template-areas:
//     'intro intro'
//     'cat cat'
//     'filters sort'
//     'filters cards';

//   &__intro {
//     grid-area: intro;
//     margin-bottom: 40px;
//   }
//   &__categories {
//     grid-area: cat;
//     display: flex;
//     align-items: center;
//     gap: 32px;
//   }

//   &__categories-title {
//     font-weight: 500;
//     font-size: 16px;
//     color: var(--grey-200);
//   }

//   &__categories-list {
//     display: flex;
//     gap: 16px;
//     align-items: center;
//   }

//   &__categories-item {
//     .base-button {
//       background-color: var(--blue-100);
//       color: var(--black);
//       text-decoration: none;
//     }

//     &.active {
//       .base-button {
//         background-color: var(--blue);
//         color: var(--white);
//       }
//     }
//   }

//   &__filters {
//     grid-area: filters;
//   }

//   &__sort {
//     max-height: 60px;
//     height: fit-content;
//     border: 1px solid var(--blue-100);
//     border-radius: 12px;
//     padding-block: 8px;
//     padding-inline: 24px 16px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     gap: 12px;
//   }

//   &__cards {
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 8px;

//     &.horizontal {
//       grid-template-columns: 1fr;
//     }
//   }
// }
</style>
