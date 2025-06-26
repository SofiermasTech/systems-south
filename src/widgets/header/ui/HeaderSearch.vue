<template>
  <div class="header-search">
    <label class="header-search__input">
      <input type="text" placeholder="Поиск" v-model="searchQuery" />
      <button class="header-search__input-btn" :class="{ active: this.searchQuery.length > 0 }">
        <BaseIcon name="SearchIcon" />
      </button>
    </label>
    <SearchPopup
      v-if="popupStore.currentPopupName === 'search'"
      :filteredProducts="filteredProducts"
      :searchQuery="searchQuery"
      @close="closeSearchPopup"
    />
  </div>
</template>

<script>
import { useCatalogStore } from '@/shared/stores/catalog.js'
import { usePopupStore } from '@/shared/stores/popup.js'
import SearchPopup from '@/widgets/search-popup/SearchPopup.vue'

export default {
  name: 'HeaderSearch',
  components: {
    SearchPopup,
  },
  data() {
    return {
      searchQuery: '',
      catalogStore: null,
      popupStore: null,
    }
  },
  computed: {
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
      if (newQuery.trim().length > 0) {
        // Открываем попап поиска через стор и передаём данные
        this.popupStore.showPopup('search', {
          searchQuery: newQuery,
          filteredProducts: this.filteredProducts,
        })
      } else if (this.popupStore.currentPopupName === 'search') {
        // Закрываем попап если строка поиска пустая
        this.popupStore.hidePopup()
      }
    },
  },
  methods: {
    closeSearchPopup() {
      this.searchQuery = ''
      // this.isSearchPopupVisible = false
      // this.$emit('toggle-overlay', false)
      this.popupStore.hidePopup()
    },
  },
  created() {
    this.catalogStore = useCatalogStore()
    this.catalogStore.loadProducts()
    this.popupStore = usePopupStore()
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
  gap: 20px;
  border-radius: 10px;

  &__input {
    width: 100%;
    padding: 28px 16px;
    border: 1px solid var(--grey-100);
    border-radius: 10px;
    position: relative;

    input {
      width: 100%;
      border: none;
      font-size: 14px;
      outline: none;
      caret-color: var(--black);

      &::placeholder {
        color: var(--grey-200);
      }
    }
  }

  &__input-btn {
    all: unset;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--grey-200);
    transition: 0.3s;

    &.active {
      color: var(--black);
    }
  }
}
</style>
