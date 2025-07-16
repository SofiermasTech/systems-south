<template>
  <button
    class="btn-search-mob"
    :class="{ 'active-open': isOpen, 'active-page': isActive }"
    type="button"
    aria-label="Открыть окно для ввода запроса"
  >
    <BaseIcon name="SearchIcon" />
  </button>
</template>

<script>
// import { useCatalogStore } from '@/shared/stores/catalog.js'
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'BaseButtonSearch',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchQuery: '',
      catalogStore: null,
      popupStore: usePopupStore(),
      windowWidth: window.innerWidth,
      // isOpen: false,
    }
  },
  methods: {
    // openSearchField() {
    //   this.popupStore.showPopup('searchMob', {})
    //   this.isOpen = true
    // },
  },
}
</script>

<style lang="scss">
.btn-search-mob {
  height: 100%;
  background-color: transparent;
  border: none;

  svg {
    color: var(--black);
  }
}
</style>
