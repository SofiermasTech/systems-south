<template>
  <div class="product-quantity">
    <button class="product-quantity__btn" @click.stop="decrementQuantity">-</button>
    <span class="product-quantity__value">{{ initialQuantity }}</span>
    <button class="product-quantity__btn" @click.stop="incrementQuantity">+</button>
  </div>
</template>

<script>
import { useCartStore } from '@/shared/stores/cart.js'

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
    }
  },
  methods: {
    incrementQuantity() {
      this.localQuantity++
      this.updateCart()
    },
    decrementQuantity() {
      this.localQuantity--
      this.updateCart()
    },
    updateCart() {
      const cartStore = useCartStore()
      const item = cartStore.cartItems.find((item) => item.id === this.productId)
      if (item) {
        if (this.localQuantity <= 0) {
          cartStore.cartItems = cartStore.cartItems.filter((item) => item.id !== this.productId)
        } else {
          item.quantity = this.localQuantity
        }
        cartStore.saveCart()
      }
    },
  },
  watch: {
    initialQuantity(newValue) {
      this.localQuantity = newValue
    },
  },
}
</script>

<style lang="scss">
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
  }

  &__value {
    margin-inline: 8px;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    color: var(--black);
  }
}
</style>
