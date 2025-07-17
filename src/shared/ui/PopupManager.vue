<template>
  <component
    v-if="isPopupVisible"
    :is="popupComponents[currentPopupName]"
    v-bind="currentPopupProps"
    @close="hidePopup"
  />
</template>

<script>
import { usePopupStore } from '@/shared/stores/popup.js'
import { lockScroll, unlockScroll } from '@/shared/config/scrollLock.js'
import LoginPopup from '@/widgets/login-popup/LoginPopup.vue'
import LogoutPopup from '@/widgets/logout-popup/LogoutPopup.vue'
import CallbackPopup from '@/widgets/callback-popup/CallbackPopup.vue'
import BaseSuccessPopup from '@/shared/ui/BaseSuccessPopup.vue'
import FiltersPopup from '@/widgets/filters-popup/FiltersPopup.vue'
import EmailChangePopup from '@/widgets/email-change-popup/EmailChangePopup.vue'

export default {
  name: 'PopupManager',
  components: {
    LoginPopup,
    LogoutPopup,
    CallbackPopup,
    BaseSuccessPopup,
    FiltersPopup,
    EmailChangePopup,
  },
  data() {
    return {
      usePopupStore: usePopupStore(),
    }
  },
  computed: {
    currentPopupName() {
      return this.usePopupStore.currentPopupName
    },
    currentPopupProps() {
      return this.usePopupStore.currentPopupProps
    },
    isPopupVisible() {
      return this.usePopupStore.isPopupVisible
    },
    popupComponents() {
      return {
        LoginPopup: this.$options.components.LoginPopup,
        LogoutPopup: this.$options.components.LogoutPopup,
        CallbackPopup: this.$options.components.CallbackPopup,
        BaseSuccessPopup: this.$options.components.BaseSuccessPopup,
        FiltersPopup: this.$options.components.FiltersPopup,
        EmailChangePopup: this.$options.components.EmailChangePopup,
      }
    },
  },
  watch: {
    isPopupVisible(newValue) {
      if (newValue) {
        lockScroll()
      } else {
        unlockScroll()
      }
    },
  },
  methods: {
    hidePopup() {
      this.usePopupStore.hidePopup()
    },
  },
  beforeUnmount() {
    if (this.isPopupVisible) {
      unlockScroll()
    }
  },
}
</script>

<style scoped lang="scss"></style>
