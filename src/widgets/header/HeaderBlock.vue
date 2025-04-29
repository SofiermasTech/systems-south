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
                  <a href="" class="header__nav-item-link"><p>О компании</p></a>
                </li>
                <li class="header__nav-item">
                  <a href="" class="header__nav-item-link">
                    <span class="header__nav-item-icon">
                      <svg
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.8 2.37501L15.3083 5.59168L18.2333 7.08335L16.7583 10L18.2416 12.9167L15.2916 14.4083L14.7833 17.625L11.5416 17.1167L9.2333 19.4167L6.91663 17.0833L3.69996 17.6167L3.1833 14.375L0.274963 12.8917L1.7583 9.97501L0.283297 7.08335L3.2083 5.57501L3.71663 2.38335L6.94163 2.91668L9.2583 0.575012L11.5666 2.88335L14.8 2.37501ZM7.17496 5.83335C6.84344 5.83335 6.5255 5.96504 6.29108 6.19946C6.05666 6.43388 5.92496 6.75182 5.92496 7.08335C5.92496 7.41487 6.05666 7.73281 6.29108 7.96723C6.5255 8.20165 6.84344 8.33335 7.17496 8.33335C7.50648 8.33335 7.82443 8.20165 8.05885 7.96723C8.29327 7.73281 8.42496 7.41487 8.42496 7.08335C8.42496 6.75182 8.29327 6.43388 8.05885 6.19946C7.82443 5.96504 7.50648 5.83335 7.17496 5.83335ZM11.3416 11.6667C11.0101 11.6667 10.6922 11.7984 10.4577 12.0328C10.2233 12.2672 10.0916 12.5852 10.0916 12.9167C10.0916 13.2482 10.2233 13.5661 10.4577 13.8006C10.6922 14.035 11.0101 14.1667 11.3416 14.1667C11.6732 14.1667 11.9911 14.035 12.2255 13.8006C12.4599 13.5661 12.5916 13.2482 12.5916 12.9167C12.5916 12.5852 12.4599 12.2672 12.2255 12.0328C11.9911 11.7984 11.6732 11.6667 11.3416 11.6667ZM6.26663 14.1667L13.425 7.00835L12.25 5.83335L5.09163 12.9917L6.26663 14.1667Z"
                          fill="#FF6F39"
                        />
                      </svg>
                    </span>
                    <p>Акции</p>
                  </a>
                </li>
                <li class="header__nav-item">
                  <a href="" class="header__nav-item-link"><p>Контакты</p></a>
                </li>
                <li class="header__nav-item">
                  <a href="" class="header__nav-item-link"><p>FAQ</p></a>
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
            <UserActions :favorites-count="favoritesCount" @toggle-cart-popup="toggleCartPopup" v-model:isOpen="isCartPopupOpen" />
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
