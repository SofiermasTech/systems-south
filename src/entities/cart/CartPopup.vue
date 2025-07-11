<template>
  <transition name="cart" :duration="{ enter: 700, leave: 300 }">
    <section class="cart-popup" v-if="isOpen">
      <!-- <div class="cart-popup__overlay" @click="closePopup"> -->
      <div class="cart-popup__body" @click.stop>
        <div class="cart-popup__header">
          <p class="cart-popup__title">Товары в корзине</p>
          <button class="cart-popup__btn-clear" @click="clearCart" type="reset">
            Очистить корзину
          </button>
        </div>
        <div class="cart-popup__content">
          <CardPopup
            v-for="item in cartItemsWithDetails"
            :key="item.id"
            :item="item"
            @remove="removeItem"
          />
        </div>
        <div class="cart-popup__bottom">
          <div class="cart-popup__total">
            <p class="cart-popup__total-title">Итого к оплате</p>
            <span class="cart-popup__total-sum">{{ totalPrice.toLocaleString('ru-RU') }} ₽</span>
          </div>
          <RouterLink to="/cart" @click="closePopup" class="cart-popup__link">
            <base-button>
              <span>Перейти в корзину</span>
            </base-button>
          </RouterLink>
        </div>
      </div>
      <!-- </div> -->
    </section>
  </transition>
</template>

<script>
import { useCartStore } from '@/shared/stores/cart.js'
import { useCatalogStore } from '@/shared/stores/catalog.js'
import { useAuthStore } from '@/shared/stores/auth.js'
import { usePopupStore } from '@/shared/stores/popup.js'
import CardPopup from '@/entities/cart/CardPopup.vue'

export default {
  name: 'CartPopup',
  components: {
    CardPopup,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cartStore: useCartStore(),
      authStore: useAuthStore(),
      catalogStore: useCatalogStore(),
      popupStore: usePopupStore(),
    }
  },
  computed: {
    cartItemsWithDetails() {
      return this.cartStore.cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        product: this.catalogStore.getProductById(item.id) || {},
      }))
    },
    totalPrice() {
      return this.cartItemsWithDetails.reduce((total, item) => {
        return total + (item.product.price || 0) * item.quantity
      }, 0)
    },
  },
  watch: {
    cartItemsWithDetails(newValue) {
      if (newValue.length === 0) {
        this.closePopup()
      }
    },
  },
  methods: {
    closePopup() {
      this.popupStore.hidePopup()
    },
    clearCart() {
      this.cartStore.clearCart()
      this.closePopup()
    },
    removeItem(productId) {
      const targetCart = this.authStore.isLoggedIn
        ? this.cartStore.cartItems
        : this.cartStore.anonymousCart
      const filteredCart = targetCart.filter((item) => item.id !== productId)
      if (this.authStore.isLoggedIn) {
        this.cartStore.cartItems = filteredCart
      } else {
        this.cartStore.anonymousCart = filteredCart
        this.cartStore.cartItems = filteredCart
      }
      this.cartStore.persistCart()
      if (this.cartStore.cartItemsCount === 0) {
        this.closePopup()
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.cart-popup {
  margin-left: auto;
  width: fit-content;
  height: 100vh;
  flex-grow: 1;
  position: relative;
  z-index: 103;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  @media screen and (max-width: 720px) {
    height: calc(100vh - 70px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
  }

  &__body {
    width: 35vw;
    height: 100%;
    padding: 32px 40px 28px 24px;
    background-color: var(--white);
    border-radius: 10px 0 0 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @include laptop-bottom {
      width: 45vw;
    }

    @include tablet-bottom {
      width: 60vw;
    }

    @media screen and (max-width: 720px) {
      width: 100vw;
      border-radius: 0;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 8px;
  }

  &__title {
    font-weight: 600;
    font-size: 20px;
    line-height: 110%;
  }

  &__btn-clear {
    font-size: 14px;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    text-align: right;
    color: var(--blue);
    background-color: transparent;
    border: none;
  }

  &__content {
    max-height: 70%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__card {
  }

  &__bottom {
    margin-top: auto;
    padding-top: 24px;
    border-top: 1px solid var(--grey-100);
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__total {
    display: flex;
    justify-content: space-between;
  }

  &__total-title {
    font-weight: 600;
    font-size: 16px;
    color: var(--grey-200);
  }

  &__total-sum {
    font-weight: 600;
    font-size: 16px;
  }

  &__link {
    width: 100%;
    text-decoration: none;

    .base-button {
      width: 100%;
    }
  }
}

.cart-enter-from,
.cart-leave-to {
  opacity: 0;
}
.cart-enter-active,
.cart-leave-active {
  transition: 0.3s ease;
}
.cart-enter-to,
.cart-leave-from {
  opacity: 1;
}

.cart-enter-from .cart-popup__body {
  transform: translateX(100%);
}
.cart-enter-active .cart-popup__body,
.cart-leave-active.cart-popup__body {
  transition: 0.7s ease;
}
.cart-enter-to .cart-popup__body {
  transform: translateX(0);
}
</style>
