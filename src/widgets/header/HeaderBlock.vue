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
                <li class="header__nav-item">
                  <RouterLink to="/about-us" class="header__nav-item-link"
                    ><p>О компании</p></RouterLink
                  >
                </li>
                <li class="header__nav-item">
                  <RouterLink to="/promo" class="header__nav-item-link">
                    <span class="header__nav-item-icon">
                      <BaseIcon name="StickerSaleIcon" />
                    </span>
                    <p>Акции</p>
                  </RouterLink>
                </li>
                <li class="header__nav-item">
                  <RouterLink to="/contacts" class="header__nav-item-link"
                    ><p>Контакты</p></RouterLink
                  >
                </li>
                <li class="header__nav-item">
                  <RouterLink to="/faq" class="header__nav-item-link"><p>FAQ</p></RouterLink>
                </li>
              </ul>
            </nav>
            <address class="header__adress">
              <p>Краснодар, ул. Солнечная, д. 4/Б, пом. 14/1</p>
            </address>
          </div>
          <div class="header__bottom">
            <!-- Кнопка каталога -->
            <CatalogButton @click="openModal('menu')" :active="activeModal === 'menu'" />
            <HeaderSearch ref="search" @toggle-overlay="$emit('toggle-overlay', $event)" />
            <HeaderContacts ref="contacts" @toggle-overlay="$emit('toggle-overlay', $event)" />
            <UserActions
              :favorites-count="favoritesCount"
              :isOpen="activeModal === 'CartPopup'"
              @toggle-cart-popup="openModal('CartPopup')"
              @login-popup="openLoginPopup"
            />
          </div>
        </div>
      </div>
    </div>
    <CartPopup
      :isOpen="activeModal === 'CartPopup'"
      @update:isOpen="
        (val) => {
          if (!val) activeModal = null
        }
      "
    />
    <MenuBlock
      :open="activeModal === 'menu'"
      @update:isOpen="
        (val) => {
          if (!val) activeModal = null
        }
      "
    />
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
      // isCartPopupOpen: false,
      // isMenuOpen: false,
      activeModal: null, // null или 'cart', 'menu', 'search', 'contacts', .
      isHidden: false,
      lastScrollPosition: 0,
    }
  },

  computed: {
    favoritesCount() {
      return this.favoritesStore ? this.favoritesStore.favoritesCount : 0
    },
    isAnyModalOpen() {
      return (
        this.isCartPopupOpen || this.isMenuOpen
        // ||
        // (this.$refs.search && this.$refs.search.isSearchPopupOpen) ||
        // (this.$refs.contacts && this.$refs.contacts.isContactsPopupOpen)
      )
    },
  },
  watch: {
    activeModal(newValue) {
      if (newValue) {
        lockScroll()
      } else {
        unlockScroll()
      }
    },
  },
  methods: {
    openModal(name) {
      if (this.activeModal === name) {
        this.activeModal = null
      } else {
        this.activeModal = name
      }
    },
    closeModal() {
      this.activeModal = null
    },
    // toggleCartPopup() {
    //   this.isCartPopupOpen = !this.isCartPopupOpen
    // },
    // toggleMenu() {
    //   this.isMenuOpen = !this.isMenuOpen
    //   if (this.isMenuOpen) {
    //     this.$refs.contacts.closeAll()
    //     this.$refs.search.closeSearchPopup()
    //     this.isCartPopupOpen = false
    //   }
    // },
    closeAll() {
      this.$refs.contacts.closeAll()
      this.$refs.search.closeSearchPopup()
      this.isCartPopupOpen = false
      this.isMenuOpen = false
    },
    openLoginPopup() {
      const popupStore = usePopupStore()
      popupStore.showPopup({
        component: 'LoginPopup',
        props: { isVisible: true },
      })
      this.isCartPopupOpen = false
      this.isMenuOpen = false
    },
    handleScroll() {
      // Текущая позиция скролла
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 150) {
        this.isHidden = false
        return
      }
      // Игнорируем отрицательные значения (на случай резинового скролла)
      if (currentScrollPosition < 0) {
        return
      }

      // Проверяем направление скролла
      if (currentScrollPosition > this.lastScrollPosition) {
        // Скролл вниз — скрываем хедер
        this.isHidden = true
      } else {
        // Скролл вверх — показываем хедер
        this.isHidden = false
      }

      // Обновляем последнюю позицию скролла
      this.lastScrollPosition = currentScrollPosition
    },
  },
  created() {
    this.favoritesStore = useFavoritesStore()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.isAnyModalOpen) {
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

  &__adress {
    font-weight: 600;
    font-size: 12px;
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
</style>
