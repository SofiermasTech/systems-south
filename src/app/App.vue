<template>
  <HeaderApp ref="headerContacts" v-if="!isErrorPage" />
  <main class="main" :class="{ 'main--err': isErrorPage }">
    <router-view />
    <Transition name="base-popup" :duration="{ enter: 700, leave: 300 }">
      <PopupManager />
    </Transition>
    <MenuMobile v-if="!isErrorPage" />
    <CookiesBanner v-if="!isErrorPage" />
  </main>

  <FooterApp v-if="!isErrorPage" />
</template>

<script>
import HeaderApp from '@/widgets/header/HeaderBlock.vue'
import FooterApp from '@/widgets/footer/FooterBlock.vue'
import PopupManager from '@/shared/ui/PopupManager.vue'
import MenuMobile from '@/widgets/menu-mobile/MenuMobile.vue'
import CookiesBanner from '@/widgets/cookies-banner/CookiesBanner.vue'

export default {
  components: {
    HeaderApp,
    FooterApp,
    PopupManager,
    MenuMobile,
    CookiesBanner,
  },
  data() {
    return {}
  },
  computed: {
    isErrorPage() {
      return this.$route.name === 'ErrorPage'
    },
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

  &--err {
    margin-top: 0;
    padding-top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
