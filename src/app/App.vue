<template>
  <HeaderApp ref="headerContacts" />
  <main class="main">
    <router-view />
    <Transition name="base-popup" :duration="{ enter: 700, leave: 300 }">
      <PopupManager />
    </Transition>
    <MenuMobile />
  </main>

  <FooterApp />
</template>

<script>
import HeaderApp from '@/widgets/header/HeaderBlock.vue'
import FooterApp from '@/widgets/footer/FooterBlock.vue'
import PopupManager from '@/shared/ui/PopupManager.vue'
import MenuMobile from '@/widgets/menu-mobile/MenuMobile.vue'

export default {
  components: {
    HeaderApp,
    FooterApp,
    PopupManager,
    MenuMobile,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.main {
  margin-top: clamp(100px, 10vw, 150px);
  flex-shrink: 1;
  overflow: hidden;

  @media screen and (max-width: 720px) {
    margin-top: 0;
    padding-top: 72px;
  }
}
</style>
