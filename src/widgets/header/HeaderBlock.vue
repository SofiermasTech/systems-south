<template>
  <header class="header">
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
                  <a href="" class="header__nav-item-link">
                    <span class="header__nav-item-icon">
                      <BaseIcon name="StickerSaleIcon" />
                    </span>
                    <p>Акции</p>
                  </a>
                </li>
                <li class="header__nav-item">
                  <a href="" class="header__nav-item-link"><p>Контакты</p></a>
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
            <CatalogButton />
            <UserActions
              :favorites-count="favoritesCount"
              @toggle-cart-popup="toggleCartPopup"
              v-model:isOpen="isCartPopupOpen"
            />
          </div>
        </div>
      </div>
    </div>
    <CartPopup v-model:isOpen="isCartPopupOpen" />
  </header>
</template>

<script>
import CatalogButton from '@widgets/header/CatalogButton.vue'
import UserActions from '@widgets/header/UserActions.vue'
import { useFavoritesStore } from '@/shared/stores/favorites.js'
import CartPopup from '@/entities/cart/CartPopup.vue'

export default {
  name: 'HeaderApp',
  components: {
    CatalogButton,
    UserActions,
    CartPopup,
  },
  data() {
    return {
      favoritesStore: null,
      isCartPopupOpen: false,
    }
  },
  created() {
    this.favoritesStore = useFavoritesStore()
  },
  computed: {
    favoritesCount() {
      return this.favoritesStore ? this.favoritesStore.favoritesCount : 0
    },
  },
  methods: {
    toggleCartPopup() {
      this.isCartPopupOpen = !this.isCartPopupOpen
    },
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
  // gap: 8px;

  &__wrapper {
    width: 100%;
    background-color: var(--white);
    // background-image: linear-gradient(
    //   to bottom,
    //   rgba(255, 255, 255, 1) 95%,
    //   rgba(255, 255, 255, 0) 96%
    // );
    position: relative;
    z-index: 101;
  }

  &__body {
    width: 100%;
    display: grid;
    grid-template-columns: 180px 1fr;
    grid-template-rows: 44px, 76px;
  }

  &__logo {
    grid-row: span 2;
  }

  &__top {
    padding-block: 12px;
    padding-left: 24px;
    width: 100%;
    // background-color: var(--white);
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
