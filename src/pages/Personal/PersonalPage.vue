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
      popupStore: usePopupStore(),
    }
  },
  methods: {
    openLogoutPopup() {
      this.popupStore.showPopup('LogoutPopup', { isVisible: true, redirectTo: this.$route.path })
    },
    closeLogoutPopup() {
      this.popupStore.hidePopup()
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
  grid-template-columns: clamp(230px, 17vw, 330px) 1fr;
  grid-template-areas:
    'intro intro'
    'sidebar content';
  row-gap: clamp(12px, 2.5vw, 70px);
  column-gap: clamp(32px, 5vw, 100px);

  @media screen and (max-width: 720px) {
    //   grid-template-columns: 1fr;
    //   grid-template-areas:
    //     'intro'
    //     'sidebar'
    //     'content';

    display: flex;
    flex-direction: column;
  }

  &__intro {
    grid-area: intro;

    &.container {
      padding-inline: 0;
    }
  }

  &__content {
    grid-area: content;

    @include mobile {
      margin-top: 16px;
      padding-bottom: 150px;
    }
  }
}
</style>
