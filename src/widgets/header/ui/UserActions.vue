<template>
  <div class="user-actions">
    <!-- Кнопка избранного -->
    <button
      class="user-actions__btn user-actions__btn--favorites"
      :class="{ active: isFavouritesPage && windowWidth < 720 }"
      type="button"
      @click="clickFavoritesBtn"
    >
      <div class="user-actions__icon">
        <BaseIcon name="FavouriteIcon" />
        <span v-if="favoritesCount > 0" class="user-actions__counter">{{ favoritesCount }}</span>
      </div>
      <span class="user-actions__text">Избранное</span>
    </button>
    <!-- Кнопки корзины -->
    <template v-if="cartItemsCount === 0 || isCartPage">
      <RouterLink
        to="/cart"
        class="user-actions__btn user-actions__btn--cart"
        :class="{ 'active-page': isActive }"
      >
        <span class="user-actions__icon">
          <BaseIcon name="CartIcon" />
          <span v-if="isCartPage && cartItemsCount !== 0" class="user-actions__counter">{{
            cartItemsCount
          }}</span>
        </span>
        <span class="user-actions__text">Корзина</span>
      </RouterLink>
    </template>
    <template v-else>
      <!-- Если в корзине есть товары, используем button для открытия попапа -->
      <button
        class="user-actions__btn user-actions__btn--cart"
        @click="toggleCartPopup"
        :class="{ 'active-open': isOpen }"
      >
        <span class="user-actions__icon">
          <BaseIcon name="CartIcon" />
          <span class="user-actions__counter">{{ cartItemsCount }}</span>
        </span>
        <span class="user-actions__text">Корзина</span>
      </button>
    </template>
    <!-- Кнопки личного кабинета -->
    <template v-if="authStore.isLoggedIn">
      <RouterLink
        to="/personal"
        class="user-actions__btn user-actions__btn--personal"
        :class="{ active: isPersonalPage && windowWidth < 720 }"
      >
        <span class="user-actions__icon">
          <BaseIcon name="UserIcon" />
        </span>
        <span class="user-actions__text">Личный кабинет</span>
      </RouterLink>
    </template>
    <template v-if="!authStore.isLoggedIn">
      <!-- Если не авторизован, используем button для открытия попапа -->
      <button class="user-actions__btn user-actions__btn--personal" @click="openLoginPopup">
        <span class="user-actions__icon">
          <BaseIcon name="UserIcon" />
        </span>
        <span class="user-actions__text">Вход</span>
      </button>
    </template>
  </div>
</template>
<script>
import { useCartStore } from '@/shared/stores/cart.js'
import { useAuthStore } from '@/shared/stores/auth.js'
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'UserActions',
  props: {
    favoritesCount: {
      type: Number,
      default: 0,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      authStore: useAuthStore(),
      popupStore: usePopupStore(),
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    cartItemsCount() {
      const cartStore = useCartStore()
      return cartStore.cartItemsCount
    },
    isCartPage() {
      return this.$route.path.startsWith('/cart')
    },
    isPersonalPage() {
      return this.$route.path.endsWith('/profile') || this.$route.path.endsWith('/orders')
    },
    isFavouritesPage() {
      return this.$route.path.endsWith('/favorites')
    },
  },
  methods: {
    toggleCartPopup() {
      if (this.popupStore.currentPopupName === 'CartPopup') {
        this.popupStore.hidePopup()
      } else {
        this.popupStore.showPopup('CartPopup', {})
      }
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
    openLoginPopup() {
      this.popupStore.showPopup('LoginPopup', {
        isVisible: true,
      })
    },
    clickFavoritesBtn() {
      if (this.authStore.isLoggedIn) {
        this.$router.push('/personal/favorites')
      } else {
        this.popupStore.showPopup('LoginPopup', {
          isVisible: true,
        })
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.updateWindowWidth)
    this.updateWindowWidth()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/utils.scss';

.user-actions {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr;
  background-image: linear-gradient(to bottom, #fff 0%, transparent);

  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(3, 1fr);
    background-image: none;
  }

  &__btn {
    text-decoration: none;
    background-color: var(--white);
    border: 1px solid var(--grey-100);
    border-radius: var(--br-btn);
    padding-inline: 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;

    @include tablet {
      padding: 8px 20px;
    }

    @include tablet-bottom {
      padding: 0 clamp(6px, 0.5vw, 10px);
      gap: 3px;
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
    color: var(--black);
    position: relative;

    @include laptop-bottom {
      width: 20px;
      height: 20px;
    }

    @include tablet-bottom {
      width: 18px;
      height: 18px;
    }
  }

  &__counter {
    position: absolute;
    top: -8px;
    right: -10px;
    background-color: var(--blue);
    border: 1px solid var(--white);
    border-radius: 50px;
    // padding: 4px;
    width: 19px;
    height: 19px;
    color: var(--white);
    font-size: 10px;
    line-height: 110%;
    display: flex;
    align-items: center;
    justify-content: center;

    @include laptop-bottom {
      width: 16px;
      height: 16px;
      font-size: 8px;
      top: -4px;
    }
  }

  &__text {
    font-weight: 500;
    @include fluid-text(14, 10);
    color: var(--grey-200);

    @include laptop-bottom {
      font-size: 12px;
    }

    @include tablet {
      font-size: 10px;
    }

    @media screen and (max-width: 720px) {
      display: none;
    }
  }

  &__btn--cart {
    &.active-page {
      background-color: var(--blue-0);

      @media screen and (max-width: 720px) {
        background-color: var(--blue);

        .user-actions__icon {
          color: var(--white);
        }

        .user-actions__counter {
          background-color: var(--white);
          color: var(--blue);
        }
      }
    }
    &.active-open {
      @media screen and (max-width: 720px) {
        background-color: transparent;
        border: 1px solid var(--blue);

        svg {
          color: var(--blue);
        }
      }
    }
  }
  &__btn--personal,
  &__btn--favorites {
    &.active {
      background-color: var(--blue-0);

      @media screen and (max-width: 720px) {
        background-color: var(--blue);
        border: 1px solid var(--blue);
        
        .user-actions__icon {
          color: var(--white);
        }

        .user-actions__counter {
          background-color: var(--white);
          color: var(--blue);
        }
      }
    }
  }
}
</style>
