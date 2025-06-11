<template>
  <component
    v-if="currentPopup"
    :is="currentPopup.component"
    v-bind="currentPopup.props"
    @close="hidePopup"
  />
</template>

<script>
import { usePopupStore } from '@/shared/stores/popup'
import LoginPopup from '@/widgets/login-popup/LoginPopup.vue'
import LogoutPopup from '@/widgets/logout-popup/LogoutPopup.vue'
import CallbackPopup from '@/widgets/callback-popup/CallbackPopup.vue'
import BaseSuccessPopup from '@/shared/ui/BaseSuccessPopup.vue'

export default {
  name: 'PopupManager',
  components: {
    LoginPopup,
    LogoutPopup,
    CallbackPopup,
    BaseSuccessPopup,
  },
  computed: {
    currentPopup() {
      return usePopupStore().getCurrentPopup
    },
  },
  methods: {
    hidePopup() {
      usePopupStore().hidePopup()
    },
  },
}
</script>

<style scoped lang="scss"></style>
