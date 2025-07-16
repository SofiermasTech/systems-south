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
            <li class="aside-filters__list-item" v-for="brand in availableBrands" :key="brand">
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
      <div class="aside-filters__item">
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
            <li
              class="aside-filters__list-item"
              v-for="subcat in availableSubcategories"
              :key="subcat.slug"
            >
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
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'CatalogFilters',
  props: {
    category: { type: String, default: null },
    subcategory: { type: String, default: null },
    products: { type: Array, default: () => [] },
  },
  emits: ['apply-filters', 'close'],
  data() {
    return {
      catalogStore: useCatalogStore(),
      popupStore: usePopupStore(),
      filterStates: {
        brand: true,
        subcategory: true,
        price: true,
      },
      selectedBrands: [],
      selectedSubcategories: [],
      priceFrom: null,
      priceTo: null,
    }
  },
  computed: {
    availableBrands() {
      let products = this.catalogStore.getProducts
      if (this.subcategory) {
        products = this.catalogStore.getProductsByCategoryAndSubcategory(
          this.category,
          this.subcategory,
        )
      } else if (this.category) {
        products = this.catalogStore.getProductsByCategory(this.category)
      }
      const brands = [...new Set(products.map((product) => product.brand))]
      return brands.filter((brand) => brand && brand.trim() !== '')
    },
    availableSubcategories() {
      let products = this.catalogStore.getProducts
      if (this.subcategory) {
        products = this.catalogStore.getProductsByCategoryAndSubcategory(
          this.category,
          this.subcategory,
        )
      } else if (this.category) {
        products = this.catalogStore.getProductsByCategory(this.category)
      }
      const subcats = [...new Set(products.map((product) => product.subcategory))]
      return subcats
        .filter((subcat) => subcat && subcat.trim() !== '')
        .map((subcat) => ({
          slug: subcat,
          name: categoryNames[subcat] || subcat,
        }))
    },
    maxPrice() {
      const products =
        this.products && this.products.length > 0 ? this.products : this.catalogStore.getProducts
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
      let priceFrom = this.priceFrom !== null ? Number(this.priceFrom) : null
      let priceTo = this.priceTo !== null ? Number(this.priceTo) : null

      if (priceFrom !== null && priceTo !== null && priceFrom > priceTo) {
        ;[priceFrom, priceTo] = [priceTo, priceFrom]
      }

      this.$emit('apply-filters', {
        brands: [...this.selectedBrands],
        subcategories: [...this.selectedSubcategories],
        priceRange: [priceFrom, priceTo],
      })

      this.closePopup()
    },
    resetFilters() {
      this.selectedBrands = []
      this.selectedSubcategories = []
      this.priceFrom = null
      this.priceTo = null
      this.$emit('apply-filters', {
        brands: [],
        subcategories: [],
        priceRange: [null, null],
      })
    },
    closePopup() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.aside-filters {
  &__wrapper {
    height: min-content;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
  }

  &__item {
    padding: clamp(16px, 1.2vw, 28px);
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
    @include fluid-text(20, 12);
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
    @include fluid-text(16, 10);
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

  &__options-btn {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @include tablet {
      display: flex;
    }
  }

  &__label-price {
    width: clamp(112px, 8.5vw, 162px);

     @include tablet {
      width: 100%;
    }
  }

  &__price {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 12px 16px;
    border: 1px solid var(--blue-200);
    border-radius: 10px;

    @include laptop {
      padding-inline: 12px;
    }

    span {
      font-weight: 500;
      font-size: 16px;
      color: var(--blue-200);
    }

    input {
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

  &__price-coin {
    // position: absolute;
    // right: 0;
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
