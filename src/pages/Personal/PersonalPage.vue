<template>
  <div class="personal container">
    <IntroPages class="personal__intro" />
    <PersonalSidebar @logout-request="openLogoutPopup" />
    <div class="personal__content">
      <router-view />
    </div>
  </div>
</template>

<script>
import IntroPages from '@widgets/intro-pages/IntroPages.vue'
import PersonalSidebar from '@/pages/personal/ui/PersonalSidebar.vue'
import { useAuthStore } from '@/shared/stores/auth.js'
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'PersonalPage',
  components: {
    IntroPages,
    PersonalSidebar,
  },
  data() {
    return {
      authStore: useAuthStore(),
    }
  },
  methods: {
    openLogoutPopup() {
      const popupStore = usePopupStore()
      popupStore.showPopup({
        component: 'LogoutPopup',
        props: { isVisible: true, redirectTo: this.$route.path },
      })
    },
    closeLogoutPopup() {
      this.isLogoutPopup = false
    },
    confirmLogout() {
      this.authStore.logout()
      this.$router.push('/')
      this.closeLogoutPopup()
    },
  },
  mounted() {
    // Перенаправление, если не авторизован
    if (!this.authStore.isLoggedIn) {
      this.$router.push({ name: 'HomePage' })
      return
    }
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/_utils.scss';

.personal {
  margin-bottom: var(--section-offset);
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    'intro intro'
    'sidebar content';
  row-gap: 60px;
  column-gap: 80px;

  &__intro {
    grid-area: intro;
  }

  &__content {
    grid-area: content;
  }
}
</style>
