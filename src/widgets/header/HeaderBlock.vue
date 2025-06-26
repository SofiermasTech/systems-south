<template>
  <header class="header" :class="{ 'header-hidden': isHidden }">
    <div class="header__wrapper">
      <div class="container">
        <div class="header__body">
          <RouterLink to="/" class="header__logo">
            <div class="logo">
              <img
                class="logo__img"
                src="@/assets/images/logo-app.svg"
                alt=""
                width="147"
                height="56"
              />
            </div>
          </RouterLink>
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
            <address class="header__address">
              <span class="header__address-icon">
                <BaseIcon name="LocationIcon" />
              </span>
              <p>Краснодар, ул. Солнечная, д. 4/Б, пом. 14/1</p>
              <time datetime="T10:00-18:00">Ежедневно с 9:00 по 18:00</time>
            </address>
          </div>
          <div class="header__bottom">
            <!-- Кнопка каталога -->
            <CatalogButton :active="this.popupStore.currentPopupName === 'menu'" />
            <HeaderSearch />
            <HeaderContacts />
            <UserActions
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

export default {
  name: 'HeaderApp',
  components: {
    CatalogButton,
    UserActions,
    HeaderSearch,
    HeaderContacts,
    CartPopup,
    MenuBlock,
  },
  data() {
    return {
      favoritesStore: null,
      popupStore: usePopupStore(),
      isHidden: false,
      lastScrollPosition: 0,
      activeCategory: null,
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
        namePopup === 'ContactForm'
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
  },
  created() {
    this.favoritesStore = useFavoritesStore()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('keydown', this.handleKeydown)
    if (this.isModalOpen) {
      unlockScroll()
    }
  },
}
</script>

<style scoped lang="scss">
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
  }

  &__body {
    width: 100%;
    display: grid;
    grid-template-columns: 180px 1fr;
    grid-template-rows: 44px 77px;
  }

  &__logo {
    background-color: var(--white);
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    grid-row: span 2;
  }

  &__top {
    padding-block: 12px;
    padding-left: 24px;
    width: 100%;
    background-color: var(--white);
    display: flex;
    justify-content: space-between;
    line-height: 0.9;
  }

  &__nav {
  }

  &__nav-list {
    display: flex;
    align-items: center;
    gap: 24px;
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
  }

  &__nav-item-icon {
    width: 20px;
    height: 20px;
    color: var(--orange);
  }

  &__address {
    font-weight: 600;
    font-size: 12px;
    display: flex;
    align-items: center;

    p {
      margin-bottom: 0;
      margin-right: 20px;
    }
  }
  &__address-icon {
    width: 20px;
    height: 20px;

    svg {
      // width: 13px;
      // height: 16px;
    }
  }

  &__bottom {
    background-image: linear-gradient(to bottom, #fff 50%, transparent);
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__btn-catalog {
  }

  &__user-actions {
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
  }
}

.logo {
  padding: 33px 17px;
  background-color: var(--black);
  border-radius: var(--br-btn);

  &__img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
}

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
