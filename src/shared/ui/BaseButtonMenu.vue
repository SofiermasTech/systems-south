<template>
  <button class="btn-menu" type="button" @click="toggleMobMenu">
    <span class="btn-menu__icon">
      <BaseIcon name="BurgerIcon" />
    </span>
  </button>
</template>

<script>
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'BaseButtonMenu',
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
  background-color: var(--blue);
  border-radius: var(--br-btn);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);

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
