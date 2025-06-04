<template>
  <div class="personal container">
    <IntroPages class="personal__intro" />
    <PersonalSidebar @logout-request="openLogoutPopup" />
    <div class="personal__content">
      <router-view />
    </div>
  </div>
  <LogoutPopup
    :is-visible="isLogoutPopup"
    @close-popup="closeLogoutPopup"
    @confirm-logout="confirmLogout"
  />
</template>

<script>
import IntroPages from '@widgets/intro-pages/IntroPages.vue'
import PersonalSidebar from '@/pages/personal/ui/PersonalSidebar.vue'
import LogoutPopup from '@/widgets/logout-popup/LogoutPopup.vue'
import HomePage from '../home/HomePage.vue'

export default {
  name: 'PersonalPage',
  components: {
    IntroPages,
    PersonalSidebar,
    LogoutPopup,
  },
  data() {
    return {
      isLogoutPopup: false,
    }
  },
  methods: {
    openLogoutPopup() {
      this.isLogoutPopup = true
    },
    closeLogoutPopup() {
      this.isLogoutPopup = false
    },
    confirmLogout() {
      this.authStore.logout()
      this.router.push({ name: HomePage })
      this.closeLogoutPopup()
    },
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
