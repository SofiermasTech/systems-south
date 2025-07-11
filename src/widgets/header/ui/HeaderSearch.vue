<template>
  <div class="header-search">
    <BaseSearchField v-if="this.windowWidth > 1030" v-model="searchQuery" @search="handleSearch" />
    <!-- <label class="header-search__input">
      <input
        type="text"
        placeholder="Поиск"
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        aria-label="Поиск товаров"
      />
      <button
        class="header-search__input-btn"
        :class="{ active: this.searchQuery.length > 0 }"
        :disabled="this.searchQuery.length === 0"
        @click="handleSearch"
        aria-label="Искать по запросу"
      >
        <BaseIcon name="SearchIcon" />
      </button>
    </label> -->
    <BaseButtonSearch v-else />
    <!-- <button
      v-else
      class="header-search__btn-mob"
      type="button"
      aria-label="Открыть окно для ввода запроса"
      @click="openSearchField"
    >
      <BaseIcon name="SearchIcon" />
    </button> -->
    <SearchPopup
      v-if="popupStore.currentPopupName === 'search' && this.windowWidth > 1030"
      :filteredProducts="filteredProducts"
      :searchQuery="searchQuery"
      @close="closeSearchPopup"
    />
  </div>
  <div
    class="header-search-mobile"
    v-if="isOpen && this.windowWidth > 600 && this.windowWidth < 1030"
  >
    <div class="container header-search-mobile__body">
      <BaseSearchField v-model="searchQuery" @search="handleSearch" />
      <BaseButtonClosePopup @click="closeSearchField" />
    </div>
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
import BaseButtonClosePopup from '@/shared/ui/BaseButtonClosePopup.vue'
import BaseSearchField from '@/shared/ui/BaseSearchField.vue'
import BaseButtonSearch from '@/shared/ui/BaseButtonSearch.vue'

export default {
  name: 'HeaderSearch',
  components: {
    SearchPopup,
    BaseButtonClosePopup,
    BaseSearchField,
    BaseButtonSearch,
  },
  props: {
    // isMobOpen: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      searchQuery: '',
      catalogStore: null,
      popupStore: null,
      windowWidth: window.innerWidth,
      isOpen: false,
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
      this.popupStore.hidePopup()
    },
    handleSearch() {
      if (this.searchQuery.trim().length === 0) return
      this.$router.push({
        path: '/search',
        query: { query: encodeURIComponent(this.searchQuery.trim()) },
      })
      this.closeSearchPopup()
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
    openSearchField() {
      this.popupStore.showPopup('searchMob', {})
      this.isOpen = true
    },
    closeSearchField() {
      this.isOpen = false
      this.popupStore.hidePopup('searchMob', {})
      this.searchQuery = ''
    },
  },
  mounted() {
    window.addEventListener('resize', this.updateWindowWidth)
    this.updateWindowWidth()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  },
  created() {
    this.catalogStore = useCatalogStore()
    this.catalogStore.loadProducts()
    this.popupStore = usePopupStore()
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.header-search {
  // max-width: 40%;
  // width: 100%;
  flex-grow: 1;
  background-color: var(--white);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: var(--br-btn);

  @include tablet {
    flex-grow: 0;
    flex-shrink: 0;
    width: 60px;
    border: 1px solid var(--grey-100);
  }

  @include tablet-bottom {
    width: 50px;
  }

  &__input {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    padding: 16px;
    border: 1px solid var(--grey-100);
    border-radius: 10px;
    display: flex;
    align-items: center;
    position: relative;

    @include tablet-bottom {
      padding: 0;
      justify-content: center;
    }

    // @include tablet {
    //   display: none;
    // }

    input {
      width: 100%;
      border: none;
      font-size: 14px;
      outline: none;
      caret-color: var(--black);

      // @include tablet-bottom {
      //   display: none;
      // }

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

    // @include tablet {
    //   display: none;

    //   // svg {
    //   //   width: 14px;
    //   //   height: 14px;
    //   // }
    // }

    @include tablet {
      color: var(--black);

      svg {
        width: 18px;
        height: 18px;
      }
    }

    &.active {
      color: var(--black);
    }
  }

  // &__btn-mob {
  //   height: 100%;
  //   background-color: transparent;
  //   border: none;
  // }
}

.header-search-mobile {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 122;
  background-color: var(--white);
  padding-block: 22px;

  @media screen and (max-width: 720px) {
    padding-block: 16px;
  }

  &__body {
    display: flex;
    justify-content: space-between;
    gap: 40px;

    @include mobile {
      gap: 20px;
    }
  }

  .header-search__input {
    width: 100%;
    height: 50px;
    padding-inline: 20px;
    flex-shrink: 1;
  }

  .btn-close-popup {
    position: static;
  }
}
</style>
