<template>
  <div class="header-search">
    <div class="header-search__input">
      <input type="text" placeholder="Поиск" v-model="searchQuery" />
    </div>
    <div class="header-search__popup" v-if="isSearchPopupVisible">
      <div class="header-search__popup-top" v-if="filteredProducts.length > 0">
        <p>Найдено {{ filteredProducts.length }} товара</p>
        <RouterLink
          :to="{ path: '/search', query: { query: searchQuery } }"
          @click="closeSearchPopup"
          >Показать все</RouterLink
        >
      </div>
      <div class="header-search__popup-result">
        <article class="popup-card" v-for="product in filteredProducts" :key="product.id">
          <div class="popup-card__img">
            <img
              :src="product.images[0]"
              :alt="product.brand"
              loading="lazy"
              width="68"
              height="68"
            />
          </div>
          <div class="popup-card__info">
            <p class="popup-card__text">{{ product.name }}</p>
            <p class="popup-card__price">{{ product.price.toLocaleString('ru-RU') }} ₽</p>
          </div>
        </article>
        <p class="header-search__popup-empty" v-if="filteredProducts.length === 0">
          По запросу ничего не найдено
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useCatalogStore } from '@/shared/stores/catalog'

export default {
  name: 'HeaderSearch',
  data() {
    return {
      searchQuery: '',
      isSearchPopupVisible: false,
      catalogStore: null,
    }
  },
  computed: {
    isOverlayVisible() {
      return this.isSearchPopupVisible
    },
    filteredProducts() {
      const query = this.searchQuery.toLowerCase().trim()
      if (!query || !this.catalogStore) return []
      return this.catalogStore.getProducts.filter((product) =>
        product.name.toLowerCase().includes(query),
      )
    },
  },
  watch: {
    searchQuery(newQuery) {
      this.isSearchPopupVisible = newQuery.trim().length > 0
      this.$emit('toggle-overlay', this.isSearchPopupVisible)
    },
  },
  methods: {
    closeSearchPopup() {
      this.searchQuery = ''
      this.isSearchPopupVisible = false
      this.$emit('toggle-overlay', false)
    },
  },
  created() {
    this.catalogStore = useCatalogStore()
    this.catalogStore.loadProducts()
  },
}
</script>

<style lang="scss">
.header-search {
  max-width: 40%;
  width: 100%;
  flex-grow: 1;
  background-color: var(--white);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 10px;

  &__input {
    width: 100%;
    padding: 28px 16px;
    border: 1px solid var(--grey-100);
    border-radius: 10px;

    input {
      width: 100%;
      border: none;
      font-size: 14px;
      outline: none;

      &::placeholder {
        color: var(--grey-200);
      }
    }
  }

  &__popup {
    max-height: 40vh;
    padding: 20px;
    border-radius: 10px;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__popup-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    p {
      margin: 0;
      font-weight: 500;
      font-size: 14px;
      color: var(--grey-200);
    }

    a {
      font-size: 14px;
      text-decoration: underline;
      text-underline-offset: 2px;
      color: var(--blue);
    }
  }

  &__popup-result {
    max-height: 80%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .popup-card {
    max-width: 340px;
  }

  .popup-card__img {
    width: 68px;
    height: 68px;
    border-radius: 10px;

    img {
      border-radius: 10px;
    }
  }

  &__popup-empty {
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    color: var(--grey-200);
  }
}
</style>
