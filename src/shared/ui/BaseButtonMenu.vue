<template>
  <button class="btn-menu" type="button" :class="{ 'active-open': isOpen, 'active-page': isActive }" @click="toggleMobMenu">
    <span class="btn-menu__icon">
      <BaseIcon name="BurgerIcon" />
    </span>
  </button>
</template>

<script>
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'BaseButtonMenu',
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
    toggleMobMenu() {
      if (this.popupStore.currentPopupName === 'MenuNavMobile') {
        this.popupStore.hidePopup()
      } else {
        this.popupStore.showPopup('MenuNavMobile', {})
      }
    },
  },
}
</script>
<style lang="scss">
.btn-menu {
  all: initial;
  background-color: var(--white);
  border-radius: var(--br-btn);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--black);

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 13px;
      height: 13px;
    }
  }
}
</style>
