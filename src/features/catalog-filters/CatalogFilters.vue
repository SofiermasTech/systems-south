<template>
  <div class="aside-filters">
    <div class="aside-filters__wrapper">
      <div class="aside-filters__item">
        <div class="aside-filters__item-heading" @click="toggleFilter('brand')">
          <h3 class="aside-filters__item-title">Бренд</h3>
          <span
            class="aside-filters__item-arrow select-arrow"
            :class="{ 'arrow-open': filterStates.brand }"
          >
            <BaseIcon name="SelectArrowIcon" />
          </span>
        </div>
        <div class="aside-filters__item-content" v-show="filterStates.brand">
          <ul class="aside-filters__list">
            <li class="aside-filters__list-item" v-for="brand in brands" :key="brand">
              <label class="aside-filters__list-item-label">
                <input type="checkbox" :value="brand" v-model="selectedBrands" />
                <span class="aside-filters__list-item-check">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 9">
                    <path
                      fill="#fff"
                      d="M11.864.655a.499.499 0 0 1-.021.707l-7.93 7.474a.6.6 0 0 1-.839-.016L.394 6.1a.5.5 0 0 1 .712-.702L3.512 7.84 11.157.634a.5.5 0 0 1 .707.021Z"
                    />
                  </svg>
                </span>
                <p>{{ brand }}</p>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div class="aside-filters__item" v-if="category && !subcategory && subcategories.length > 0">
        <div class="aside-filters__item-heading" @click="toggleFilter('subcategory')">
          <h3 class="aside-filters__item-title">Подкатегории</h3>
          <span
            class="aside-filters__item-arrow select-arrow"
            :class="{ 'arrow-open': filterStates.subcategory }"
          >
            <BaseIcon name="SelectArrowIcon" />
          </span>
        </div>
        <div class="aside-filters__item-content" v-show="filterStates.subcategory">
          <ul class="aside-filters__list">
            <li class="aside-filters__list-item" v-for="subcat in subcategories" :key="subcat.slug">
              <label class="aside-filters__list-item-label">
                <input type="checkbox" :value="subcat.slug" v-model="selectedSubcategories" />
                <span class="aside-filters__list-item-check">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 9">
                    <path
                      fill="#fff"
                      d="M11.864.655a.499.499 0 0 1-.021.707l-7.93 7.474a.6.6 0 0 1-.839-.016L.394 6.1a.5.5 0 0 1 .712-.702L3.512 7.84 11.157.634a.5.5 0 0 1 .707.021Z"
                    />
                  </svg>
                </span>
                <p>{{ subcat.name }}</p>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div class="aside-filters__item">
        <div class="aside-filters__item-heading" @click="toggleFilter('price')">
          <h3 class="aside-filters__item-title">Цена</h3>
          <span
            class="aside-filters__item-arrow select-arrow"
            :class="{ 'arrow-open': filterStates.price }"
          >
            <BaseIcon name="SelectArrowIcon" />
          </span>
        </div>
        <div class="aside-filters__item-content" v-show="filterStates.price">
          <div class="aside-filters__options-btn">
            <label class="aside-filters__label-price">
              <div class="aside-filters__price">
                <span class="aside-filters__price-from">от</span>
                <input
                  id="price-from"
                  class="filter-input"
                  type="text"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  value=""
                  placeholder="0"
                  minlength="2"
                  v-model.number="priceFrom"
                />
                <span class="aside-filters__price-coin">₽</span>
              </div>
            </label>
            <label class="aside-filters__label-price">
              <div class="aside-filters__price">
                <span class="aside-filters__price-to">до</span>
                <input
                  id="price-to"
                  class="filter-input"
                  type="text"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  value=""
                  :placeholder="maxPrice || 99999"
                  minlength="2"
                  v-model.number="priceTo"
                />
                <span class="aside-filters__price-coin">₽</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="aside-filters__btn-wrapper">
        <button class="aside-filters__btn-submit" type="button" @click="applyFilters">
          Применить
        </button>
        <button class="aside-filters__btn-reset" type="reset" @click="resetFilters">
          Сбросить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCatalogStore } from '@/shared/stores/catalog.js'
import { categoryNames } from '@/shared/config/categoryNames.js'

export default {
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
      filterStates: {
        brand: true,
        price: false,
      },
      selectedBrands: [],
      appliedBrands: [],
      selectedSubcategories: [],
      appliedSubcategories: [],
      priceFrom: null,
      priceTo: null,
      appliedPriceRange: [null, null],
    }
  },
  emits: ['apply-filters'],
  async created() {
    this.catalogStore = useCatalogStore()
    await this.catalogStore.loadProducts()

    // Восстанавливаем состояния из localStorage
    const savedFilterStates = localStorage.getItem('filterStates')
    if (savedFilterStates) {
      this.filterStates = JSON.parse(savedFilterStates)
    }

    const savedSelectedBrands = localStorage.getItem('selectedBrands')
    if (savedSelectedBrands) {
      this.selectedBrands = JSON.parse(savedSelectedBrands)
    }

    const savedAppliedBrands = localStorage.getItem('appliedBrands')
    if (savedAppliedBrands) {
      this.appliedBrands = JSON.parse(savedAppliedBrands)
      // Эмитим событие, чтобы применить сохранённые фильтры
      this.$emit('apply-filters', { brands: this.appliedBrands })
    }

    const savedSelectedSubcategories = localStorage.getItem('selectedSubcategories')
    if (savedSelectedSubcategories) {
      this.selectedSubcategories = JSON.parse(savedSelectedSubcategories)
    }

    const savedAppliedSubcategories = localStorage.getItem('appliedSubcategories')
    if (savedAppliedSubcategories) {
      this.appliedSubcategories = JSON.parse(savedAppliedSubcategories)
    }

    const savedPriceFrom = localStorage.getItem('priceFrom')
    if (savedPriceFrom) {
      this.priceFrom = JSON.parse(savedPriceFrom)
    }

    const savedPriceTo = localStorage.getItem('priceTo')
    if (savedPriceTo) {
      this.priceTo = JSON.parse(savedPriceTo)
    }
    const savedAppliedPriceRange = localStorage.getItem('appliedPriceRange')
    if (savedAppliedPriceRange) {
      this.appliedPriceRange = JSON.parse(savedAppliedPriceRange)
      this.$emit('apply-filters', {
        brands: this.appliedBrands,
        priceRange: this.appliedPriceRange,
      })
    }
  },
  watch: {
    filterStates: {
      handler(newValue) {
        localStorage.setItem('filterStates', JSON.stringify(newValue))
      },
      deep: true, // Отслеживаем изменения внутри объекта
    },
    selectedBrands(newValue) {
      localStorage.setItem('selectedBrands', JSON.stringify(newValue))
    },
    appliedBrands(newValue) {
      localStorage.setItem('appliedBrands', JSON.stringify(newValue))
    },
    selectedSubcategories(newValue) {
      localStorage.setItem('selectedSubcategories', JSON.stringify(newValue))
    },
    appliedSubcategories(newValue) {
      localStorage.setItem('appliedSubcategories', JSON.stringify(newValue))
    },
    priceFrom(newValue) {
      localStorage.setItem('priceFrom', JSON.stringify(newValue))
    },
    priceTo(newValue) {
      localStorage.setItem('priceTo', JSON.stringify(newValue))
    },
    appliedPriceRange(newValue) {
      localStorage.setItem('appliedPriceRange', JSON.stringify(newValue))
    },
    category() {
      this.resetFilters()
    },
    subcategory() {
      this.resetFilters()
    },
  },
  computed: {
    products() {
      return this.catalogStore.getProducts
    },
    brands() {
      let products = []
      if (this.subcategory) {
        products = this.catalogStore.getProductsByCategoryAndSubcategory(
          this.category,
          this.subcategory,
        )
      } else if (this.category) {
        products = this.catalogStore.getProductsByCategory(this.category)
      } else {
        products = this.catalogStore.getProducts
      }

      if (!products || !Array.isArray(products)) {
        return []
      }

      const brands = [...new Set(products.map((product) => product.brand))]
      return brands.filter((brand) => brand && brand.trim() !== '')
    },
    subcategories() {
      if (!this.category || this.subcategory) {
        return []
      }
      const subcats = this.catalogStore.getSubcategoriesByCategory(this.category)
      return subcats.map((subcat) => ({
        slug: subcat,
        name: categoryNames[subcat] || subcat,
      }))
    },
    maxPrice() {
      let products = []
      if (this.subcategory) {
        products = this.catalogStore.getProductsByCategoryAndSubcategory(
          this.category,
          this.subcategory,
        )
      } else if (this.category) {
        products = this.catalogStore.getProductsByCategory(this.category)
      } else {
        products = this.catalogStore.getProducts
      }

      if (!products || !Array.isArray(products) || products.length === 0) {
        return null
      }

      const max = Math.max(...products.map((product) => product.price))
      return isFinite(max) ? max : null
    },
  },
  methods: {
    toggleFilter(filterId) {
      this.filterStates[filterId] = !this.filterStates[filterId]
    },
    applyFilters() {
      this.appliedBrands = [...this.selectedBrands]
      this.appliedSubcategories = [...this.selectedSubcategories]
      let priceFrom = this.priceFrom !== null ? Number(this.priceFrom) : null
      let priceTo = this.priceTo !== null ? Number(this.priceTo) : null

      if (priceFrom !== null && priceTo !== null && priceFrom > priceTo) {
        ;[priceFrom, priceTo] = [priceTo, priceFrom] // Поменять местами, если from > to
      }

      this.appliedPriceRange = [priceFrom, priceTo]
      this.$emit('apply-filters', {
        brands: this.appliedBrands,
        subcategories: this.appliedSubcategories,
        priceRange: this.appliedPriceRange,
      })
    },
    resetFilters() {
      this.selectedBrands = []
      this.appliedBrands = []
      this.selectedSubcategories = []
      this.appliedSubcategories = []
      this.priceFrom = null
      this.priceTo = null
      this.appliedPriceRange = [null, null]
      this.$emit('apply-filters', { brands: this.appliedBrands })
      localStorage.removeItem('filterStates')
      localStorage.removeItem('selectedBrands')
      localStorage.removeItem('appliedBrands')
      localStorage.removeItem('selectedSubcategories')
      localStorage.removeItem('appliedSubcategories')
      localStorage.removeItem('priceFrom')
      localStorage.removeItem('priceTo')
      localStorage.removeItem('appliedPriceRange')
    },
  },
}
</script>

<style lang="scss">
.aside-filters {
  &__wrapper {
    height: min-content;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
  }

  &__item {
    padding: 24px;
    border: 1px solid var(--blue-100);
    border-radius: var(--br-block);
  }

  &__item-heading {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  &__item-title {
    font-weight: 700;
    font-size: 16px;
    color: var(--black);
  }

  &__item-arrow {
    width: 20px;
    height: 20px;
    transition: 0.3s ease;
    transform-origin: 10px 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 10px;
      height: 8px;
    }

    &.arrow-open {
      transform: rotate(180deg);
      transition: 0.3s ease;
    }
  }

  &__item-content {
    margin-top: 20px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 14px;
  }

  &__list-item {
    font-size: 14px;
    color: var(--grey-200);
  }

  &__list-item-label {
    display: flex;
    align-items: center;
    column-gap: 12px;
    cursor: pointer;

    input[type='checkbox'],
    input[type='radio'] {
      clip: rect(0 0 0 0);
      -webkit-clip-path: inset(50%);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    & input:checked + .aside-filters__list-item-check {
      border-color: var(--blue);
      background-color: var(--blue);

      svg {
        color: #fff;
      }
    }
  }

  &__list-item-check {
    border: 1px solid var(--grey-200);
    border-radius: 4px;
    width: 20px;
    height: 20px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color 0.3s ease-out,
      border-color 0.3s ease-out;
    color: #fff;

    svg {
      color: transparent;
      width: 12px;
      height: 9px;
    }
  }

  &__options {
  }

  &__options-btn {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  &__label-price {
    max-width: 142px;
  }

  &__price {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 12px 16px;
    border: 1px solid var(--blue-200);
    border-radius: 10px;

    span {
      font-weight: 500;
      font-size: 16px;
      color: var(--blue-200);
    }

    input {
      flex-shrink: 1;
      border: none;
      outline: none;
      max-width: 70px;
      width: fit-content;

      &::placeholder {
        font-weight: 500;
        font-size: 16px;
        color: var(--blue-200);
      }
    }
  }

  &__price-to {
  }

  &__btn-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  &__btn-submit {
    flex-grow: 1;
    padding: 14px;
    background-color: var(--black);
    border: 1px solid var(--black);
    border-radius: 500px;
    font-weight: 500;
    font-size: 12px;
    color: var(--white);
  }

  &__btn-reset {
    flex-grow: 1;
    padding: 14px;
    background-color: transparent;
    border: 1px solid var(--blue-100);
    border-radius: 500px;
    font-weight: 500;
    font-size: 12px;
    color: var(--black);
  }
}
.select-arrow {
}
.filter-input {
}
</style>
