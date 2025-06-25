<template>
  <HeaderApp ref="headerContacts" @toggle-overlay="updateOverlay" />
  <main class="main">
    <router-view />
    <Transition name="base-popup" :duration="{ enter: 700, leave: 300 }">
      <PopupManager />
    </Transition>
    <div class="overlay-page" v-if="isOverlayVisible" @click="closeOverlay"></div>
  </main>
  <FooterApp />
</template>

<script>
import HeaderApp from '@/widgets/header/HeaderBlock.vue'
import FooterApp from '@/widgets/footer/FooterBlock.vue'
import PopupManager from '@/shared/ui/PopupManager.vue'

export default {
  components: {
    HeaderApp,
    FooterApp,
    PopupManager,
  },
  data() {
    return {
      isOverlayVisible: false,
    }
  },
  watch: {
    '$route.path': {
      handler() {
        this.isOverlayVisible = false
        this.$refs.headerContacts.closeAll()
      },
    },
  },
  methods: {
    updateOverlay(isVisible) {
      this.isOverlayVisible = isVisible
    },
    closeOverlay() {
      this.isOverlayVisible = false
      this.$refs.headerContacts.closeAll()
    },
  },
}
</script>

<style lang="scss">
.main {
  margin-top: 140px;
  flex-shrink: 1;
}
.overlay-page {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: calc(100vh - 121px);
  background-color: var(--grey-300);
  z-index: 95;
}
</style>
