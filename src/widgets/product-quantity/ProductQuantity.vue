<template>
  <div class="product-quantity">
    <button class="product-quantity__btn" @click.stop="decrementQuantity">-</button>
    <span class="product-quantity__value">{{ initialQuantity }}</span>
    <button class="product-quantity__btn" @click.stop="incrementQuantity">+</button>
  </div>
</template>

<script>
import { useCartStore } from '@/shared/stores/cart.js'
import { useAuthStore } from '@/shared/stores/auth.js'

export default {
  props: {
    productId: {
      type: Number,
      required: true,
    },
    initialQuantity: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      localQuantity: this.initialQuantity,
      cartStore: useCartStore(),
      authStore: useAuthStore(),
    }
  },
  watch: {
    initialQuantity(newValue) {
      this.localQuantity = newValue
    },
  },
  methods: {
    incrementQuantity() {
      this.localQuantity++
      this.updateCart()
    },
    decrementQuantity() {
      if (this.localQuantity > 1) {
        this.localQuantity--
        this.updateCart()
      } else {
        const targetCart = this.authStore.isLoggedIn
          ? this.cartStore.cartItems
          : this.cartStore.anonymousCart
        this.cartStore.cartItems = targetCart.filter((item) => item.id !== this.productId)
        if (!this.authStore.isLoggedIn) {
          this.cartStore.anonymousCart = this.cartStore.cartItems
        }
        this.cartStore.persistCart()
      }
    },
    updateCart() {
      const item = this.cartStore.cartItems.find((item) => item.id === this.productId)
      const targetCart = this.authStore.isLoggedIn
        ? this.cartStore.cartItems
        : this.cartStore.anonymousCart
      if (item && this.localQuantity > 0) {
        item.quantity = this.localQuantity
      }

      if (!this.authStore.isLoggedIn) {
        this.cartStore.anonymousCart = targetCart
      }
      this.cartStore.persistCart()
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.product-quantity {
  width: fit-content;
  background-color: var(--white);
  border: 1px solid var(--grey-100);
  border-radius: 500px;
  padding: 5px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__btn {
    padding: 0;
    background-color: var(--grey-100);
    border: none;
    border-radius: 500px;
    width: 32px;
    height: 32px;
    font-weight: 500;

    @include tablet-bottom {
      width: 24px;
      height: 24px;
    }
  }

  &__value {
    margin-inline: 8px;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    color: var(--black);

    @include tablet {
      font-size: 12px;
    }
  }
}
</style>
