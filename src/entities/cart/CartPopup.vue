<template>
  <section class="cart-popup" v-if="isOpen">
    <div class="cart-popup__overlay" @click="closePopup">
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
    </div>
  </section>
</template>

<script>
import { useCartStore } from '@/shared/stores/cart.js'
import { useCatalogStore } from '@/shared/stores/catalog.js'
import { useAuthStore } from '@/shared/stores/auth.js'
import CardPopup from '@/entities/cart/CardPopup.vue'

export default {
  data() {
    return {
      cartStore: useCartStore(),
      authStore: useAuthStore(),
      catalogStore: useCatalogStore(),
    }
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CardPopup,
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
  methods: {
    closePopup() {
      this.$emit('update:isOpen', false)
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
  watch: {
    cartItemsWithDetails(newValue) {
      if (newValue.length === 0) {
        this.closePopup()
      }
    },
  },
}
</script>

<style lang="scss">
.cart-popup {
  width: 100vw;
  height: 100%;
  flex-grow: 1;

  &__overlay {
    z-index: 100;
    width: 100%;
    height: calc(100vh - 120px);
    background-color: var(--grey-300);
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  &__body {
    max-width: 30vw;
    max-height: calc(100vh - 132px);
    width: 100%;
    height: 100%;
    padding: 32px 40px 28px 24px;
    background-color: var(--white);
    border-radius: 10px 0 0 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
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
</style>
