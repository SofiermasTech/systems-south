<template>
  <button class="base-button-call" type="button" @click="openCallbackPopup">Заказать звонок</button>
</template>

<script>
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'BaseButtonCall',
  data() {
    return {
      popupStore: usePopupStore(),
    }
  },
  methods: {
    openCallbackPopup() {
      this.popupStore.showPopup('CallbackPopup', {
        isVisible: true,
      })
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.base-button-call {
  width: fit-content;
  padding: 0;
  padding-bottom: 1px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--blue);
  @include fluid-text(14, 10);
  color: var(--blue);
  text-decoration: none;
}
</style>
