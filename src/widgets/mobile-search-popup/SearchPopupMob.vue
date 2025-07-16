<template>
  <div class="header-search-mobile" v-if="isOpen">
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
// import { useCatalogStore } from '@/shared/stores/catalog.js'
// import { usePopupStore } from '@/shared/stores/popup.js'
import SearchPopup from '@/widgets/search-popup/SearchPopup.vue'
import BaseButtonClosePopup from '@/shared/ui/BaseButtonClosePopup.vue'
import BaseSearchField from '@/shared/ui/BaseSearchField.vue'

export default {
  name: 'SearchPopupMob',
  components: {
    SearchPopup,
    BaseButtonClosePopup,
    BaseSearchField,
  },
  props: {
    filteredProducts: {
      type: Array,
      default: () => [],
    },
    searchQuery: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      catalogStore: null,
      popupStore: null,
      windowWidth: window.innerWidth,
      isOpen: false,
    }
  },
}
</script>
