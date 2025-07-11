<template>
  <header class="header" :class="{ 'header-hidden': isHidden }">
    <div class="header__wrapper">
      <div class="container">
        <div class="header__body">
          <BaseLogo />
          <div class="header__top">
            <nav class="header__nav">
              <ul class="header__nav-list">
                <li v-for="link in navLinks" :key="link.key" class="header__nav-item">
                  <RouterLink :to="link.path" class="header__nav-item-link">
                    <span v-if="link.icon" class="header__nav-item-icon">
                      <BaseIcon :name="link.icon" />
                    </span>
                    <p>{{ link.name }}</p>
                  </RouterLink>
                </li>
              </ul>
            </nav>
            <BaseAddressText />
          </div>
          <div class="header__bottom">
            <!-- Кнопка каталога -->
            <CatalogButton
              class="header__btn-catalog"
              :active="this.popupStore.currentPopupName === 'menu'"
            />
            <HeaderSearch v-if="windowWidth >= 720" />
            <!-- <BaseButtonSearch /> -->
            <HeaderContacts />
            <UserActions
              class="header__user-actions"
              :favorites-count="favoritesCount"
              :isOpen="this.popupStore.currentPopupName === 'CartPopup'"
            />
          </div>
        </div>
      </div>
    </div>
    <CartPopup :isOpen="this.popupStore.currentPopupName === 'CartPopup'" />
    <MenuBlock
      :open="this.popupStore.currentPopupName === 'menu'"
      :activeCategory="activeCategory"
      @update:activeCategory="(val) => (activeCategory = val)"
    />
    <MenuNavMobile :isVisible="this.popupStore.currentPopupName === 'MenuNavMobile'" />
    <Transition name="overlay" :duration="{ enter: 500, leave: 300 }">
      <div class="header__overlay" v-if="isModalOpen" @click="closePopup"></div>
    </Transition>
  </header>
</template>

<script>
import CatalogButton from '@widgets/header/ui/CatalogButton.vue'
import UserActions from '@widgets/header/ui/UserActions.vue'
import HeaderSearch from '@widgets/header/ui/HeaderSearch.vue'
import HeaderContacts from '@widgets/header/ui/HeaderContacts.vue'
import { useFavoritesStore } from '@/shared/stores/favorites.js'
import { usePopupStore } from '@/shared/stores/popup.js'
import CartPopup from '@/entities/cart/CartPopup.vue'
import MenuBlock from '@widgets/menu/MenuBlock.vue'
import { lockScroll, unlockScroll } from '@/shared/config/scrollLock.js'
import { navLinks } from '@/shared/config/navLinks.js'
import BaseAddressText from '@/shared/ui/BaseAddressText.vue'
import BaseLogo from '@/shared/ui/BaseLogo.vue'
import MenuNavMobile from '../mobile-nav-menu/MenuNavMobile.vue'
// import BaseButtonSearch from '@/shared/ui/BaseButtonSearch.vue'

export default {
  name: 'HeaderApp',
  components: {
    CatalogButton,
    UserActions,
    HeaderSearch,
    HeaderContacts,
    CartPopup,
    MenuBlock,
    BaseAddressText,
    BaseLogo,
    MenuNavMobile,
    // BaseButtonSearch,
  },
  data() {
    return {
      favoritesStore: null,
      popupStore: usePopupStore(),
      isHidden: false,
      lastScrollPosition: 0,
      activeCategory: null,
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    navLinks() {
      return navLinks
    },
    favoritesCount() {
      return this.favoritesStore ? this.favoritesStore.favoritesCount : 0
    },
    isModalOpen() {
      const namePopup = this.popupStore.currentPopupName
      return (
        namePopup === 'menu' ||
        namePopup === 'CartPopup' ||
        namePopup === 'search' ||
        namePopup === 'ContactEmail' ||
        namePopup === 'ContactForm' ||
        namePopup === 'MenuNavMobile' ||
        namePopup === 'searchMob'
      )
    },
  },
  watch: {
    isModalOpen(newValue) {
      if (newValue) {
        lockScroll()
      } else {
        unlockScroll()
      }
    },
    $route() {
      this.closePopup()
    },
  },
  methods: {
    handleScroll() {
      // Текущая позиция скролла
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 150) {
        this.isHidden = false
        return
      }
      if (currentScrollPosition < 0) {
        return
      }
      // Проверяем направление скролла
      if (currentScrollPosition > this.lastScrollPosition) {
        this.isHidden = true
      } else {
        this.isHidden = false
      }
      // Обновляем последнюю позицию скролла
      this.lastScrollPosition = currentScrollPosition
    },
    closePopup() {
      this.popupStore.hidePopup()
      this.activeCategory = null
    },
    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.closePopup()
      }
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
  },
  created() {
    this.favoritesStore = useFavoritesStore()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('keydown', this.handleKeydown)
    window.addEventListener('resize', this.updateWindowWidth)
    this.updateWindowWidth()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('keydown', this.handleKeydown)
    window.removeEventListener('resize', this.updateWindowWidth)
    if (this.isModalOpen) {
      unlockScroll()
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/utils.scss';

.header {
  width: 100vw;
  max-height: 100vh;
  height: fit-content;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;

  @media screen and (max-width: 720px) {
    background-color: var(--white);
  }

  &.header-hidden {
    transform: translateY(-100%);
  }

  &__wrapper {
    margin-bottom: 12px;
    width: 100%;
    position: relative;
    z-index: 101;
    background-color: #fff;
    padding-bottom: 8px;

    @media screen and (max-width: 720px) {
      padding-bottom: 8px;
      margin-bottom: 0;
      background-color: transparent;
    }
  }

  &__body {
    width: 100%;
    display: grid;
    grid-template-columns: 180px 1fr;
    grid-template-rows: 45px 77px;
    grid-template-areas: none;

    @include laptop-bottom {
      grid-template-columns: 130px 1fr;
      grid-template-rows: 32px 60px;
    }

    @include tablet-bottom {
      grid-template-columns: 110px 1fr;
      grid-template-rows: 32px 50px;
      grid-template-areas:
        'top top'
        'logo btns';
    }

    @media screen and (max-width: 720px) {
      padding-top: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 69px;
    }
  }

  &__top {
    padding-block: 12px;
    padding-left: 24px;
    width: 100%;
    background-color: var(--white);
    display: flex;
    justify-content: space-between;
    line-height: 0.9;

    @include laptop-bottom {
      padding-block: 7px 8px;
      padding-left: 8px;
    }

    @include tablet-bottom {
      grid-area: top;
    }

    @media screen and (max-width: 720px) {
      display: none;
    }
  }

  &__nav {
  }

  &__nav-list {
    display: flex;
    align-items: center;
    gap: clamp(10px, 1vw, 24px);
  }

  &__nav-item {
  }

  &__nav-item-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-weight: 500;
    font-size: 12px;
    color: var(--black);
    text-decoration: none;

    @include laptop-bottom {
      font-size: 10px;
    }
  }

  &__nav-item-icon {
    width: 20px;
    height: 20px;
    color: var(--orange);
  }

  &__bottom {
    background-image: linear-gradient(to bottom, #fff 50%, transparent);
    width: 100%;
    display: flex;
    justify-content: space-between;

    @include tablet-bottom {
      grid-area: btns;
    }

    @media screen and (max-width: 720px) {
      width: fit-content;
      height: 100%;
      border-radius: var(--br-btn);
    }
  }

  &__btn-catalog {
    @media screen and (max-width: 720px) {
      display: none;
    }
  }

  // .header-search {
  //   @media screen and (max-width: 720px) {
  //     display: none;
  //   }
  // }

  &__user-actions {
    @media screen and (max-width: 720px) {
      display: none;
    }
  }

  &__overlay {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100vh;
    background-color: var(--grey-300);
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    transition: opacity 0.5s;

    // @media screen and (max-width: 720px) {
    //   display: none;
    // }
  }
}

// .logo {
//   width: 100%;
//   background-color: var(--black);
//   border-radius: var(--br-btn);
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   &__img {
//     width: 70%;
//     object-fit: contain;
//     object-position: center;
//   }
// }

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
.overlay-enter-active,
.overlay-leave-active {
  transition: 0.5s ease;
}
.overlay-enter-to,
.overlay-leave-from {
  opacity: 1;
}
</style>
