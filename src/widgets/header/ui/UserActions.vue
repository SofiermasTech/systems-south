<template>
  <div class="header__user-actions user-actions">
    <!-- Кнопка избранного -->
    <button
      class="user-actions__btn user-actions__btn--favorites"
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
      <RouterLink to="/cart" class="user-actions__btn user-actions__btn--cart">
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
        :class="{ 'popup-open': isOpen }"
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
      <RouterLink to="/personal" class="user-actions__btn user-actions__btn--personal">
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
  },
  data() {
    return {
      authStore: useAuthStore(),
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
  },
  // watch: {
  //   isOpen(newVal) {
  //     if (!newVal) this.toggleCartPopup()
  //   },
  // },
  methods: {
    toggleCartPopup() {
      this.$emit('toggle-cart-popup')
    },
    // closeCartPopup() {
    //   this.$emit('update:isOpen', false)
    // },
    // openCartPopup() {
    //   this.$emit('update:isOpen', true)
    // },
    openLoginPopup() {
      this.$emit('login-popup')
    },
    clickFavoritesBtn() {
      if (this.authStore.isLoggedIn) {
        this.$router.push('/personal/favorites')
      } else {
        const popupStore = usePopupStore()
        popupStore.showPopup({
          component: 'LoginPopup',
          props: { isVisible: true },
        })
      }
    },
  },
}
</script>
<style lang="scss">
.user-actions {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr;
  background-image: linear-gradient(to bottom, #fff 0%, transparent);

  &__btn {
    text-decoration: none;
    background-color: var(--white);
    border: 1px solid var(--grey-100);
    border-radius: var(--br-btn);
    padding: 14px 17px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  &__btn--favorites {
  }

  &__icon {
    width: 24px;
    height: 24px;
    color: var(--black);
    position: relative;
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
  }

  &__text {
    font-weight: 500;
    font-size: 14px;
    color: var(--grey-200);
  }

  &__btn--cart {
    &.popup-open {
      background-color: var(--blue-0);
    }
  }
}
</style>
