<template>
  <button type="button" class="btn-catalog" @click="toggleMenu" :class="{ 'active-open': isOpen, 'active-page': isActive }">
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
@import '@/assets/styles/utils.scss';

.btn-catalog {
  flex-shrink: 0;
  padding: 8px clamp(6px, 1vw, 20px);
  background-color: var(--blue);
  border-color: transparent;
  border-radius: var(--br-btn);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--white);

  @include tablet {
    gap: 4px;
  }

  @media screen and (max-width: 720px) {
    background-color: var(--white);
    color: var(--black);
  }

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

    @include laptop-bottom {
      font-size: 10px;
    }

    @media screen and (max-width: 720px) {
      display: none;
    }
  }

  &.active {
    background-color: var(--white);
    border-color: var(--blue);
    color: var(--blue);

    @media screen and (max-width: 720px) {
      background-color: var(--blue);
      color: var(--white);
    }
  }
}
</style>
