<template>
  <Transition name="menu-mob" :duration="{ enter: 500, leave: 300 }">
    <section class="menu-nav" v-if="isVisible">
      <div class="container">
        <div class="menu-nav__body">
          <div class="menu-nav__header">
            <BaseLogo />
            <BaseButtonClosePopup @click="closePopup" />
          </div>
          <div class="menu-nav__address">
            <BaseAddressText />
          </div>
          <nav class="menu-nav__nav">
            <ul class="menu-nav__list">
              <li v-for="link in navMobLinks" :key="link.key" class="menu-nav__list-item">
                <RouterLink :to="link.path" class="menu-nav__list-item-link">
                  <p>{{ link.name }}</p>
                </RouterLink>
              </li>
            </ul>
          </nav>
          <div class="menu-nav__phone">
            <a class="menu-nav__phone-link" href="tel:+78612125445">+7 (861) 212-54-45</a>
          </div>
        </div>
      </div>
    </section>
  </Transition>
</template>

<script>
import BaseAddressText from '@/shared/ui/BaseAddressText.vue'
import BaseButtonClosePopup from '@/shared/ui/BaseButtonClosePopup.vue'
import BaseLogo from '@/shared/ui/BaseLogo.vue'
import { navMobLinks } from '@/shared/config/navMobLinks.js'
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'MenuNavMobile',
  components: {
    BaseLogo,
    BaseButtonClosePopup,
    BaseAddressText,
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      popupStore: usePopupStore(),
    }
  },
  computed: {
    navMobLinks() {
      return navMobLinks
    },
  },
  methods: {
    closePopup() {
      this.popupStore.hidePopup()
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.menu-nav {
  width: 100vw;
  height: calc(100vh - 70px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  padding-block: 10px;
  background-color: var(--white);

  // @media screen and (max-width: 720px) {
  //   display: flex;
  // }

  &__body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 32px;
  }

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn-close-popup {
      border: 1px solid var(--grey-100);
      width: 32px;
      height: 32px;
      position: static;
      padding: 0;

      svg {
        width: 12px;
        height: 12px;
      }
    }
  }

  &__address {
    .header-address {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;

      span,
      time {
        font-size: 12px;
        font-weight: 600;
      }
    }
  }

  &__nav {
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__list-item-link {
    text-decoration: none;
    font-weight: 500;
    font-size: 24px;
    color: var(--blue);
  }

  &__phone {
  }

  &__phone-link {
    text-decoration: none;
    font-weight: 500;
    font-size: 24px;
    color: var(--blue);
  }
}

.menu-mob-enter-from,
.menu-mob-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.menu-mob-enter-active,
.menu-mob-leave-active {
  transition: 0.5s ease;
}
.menu-mob-enter-to,
.menu-mob-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
