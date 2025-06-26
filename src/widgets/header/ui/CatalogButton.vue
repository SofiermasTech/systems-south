<template>
  <button
    type="button"
    class="header__btn-catalog btn-catalog"
    @click="toggleMenu"
    :class="{ active: active }"
  >
    <span class="btn-catalog__icon">
      <BaseIcon name="CatalogButtonIcon" />
    </span>
    <p class="btn-catalog__text">Каталог товаров</p>
  </button>
</template>
<script>
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'CatalogButton',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      popupStore: usePopupStore(),
    }
  },
  methods: {
    toggleMenu() {
      if (this.popupStore.currentPopupName === 'menu') {
        this.popupStore.hidePopup()
      } else {
        this.popupStore.showPopup('menu', {})
      }
    },
  },
}
</script>
<style lang="scss">
.btn-catalog {
  flex-shrink: 0;
  padding: 28px 20px;
  background-color: var(--blue);
  border-color: transparent;
  border-radius: var(--br-btn);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--white);

  &__icon {
    width: 20px;
    height: 20px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__text {
    font-weight: 500;
    font-size: 12px;
  }

  &.active {
    background-color: var(--white);
    border-color: var(--blue);
    color: var(--blue);
  }
}
</style>
