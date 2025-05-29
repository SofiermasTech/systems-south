<template>
  <BaseCartPage title="Корзина" theme="default">
    <template #cart-empty>
      <div v-if="cartItems.length === 0" class="cart__empty">
        <div class="cart__empty-wrapper">
          <p class="cart__empty-title">В корзине нет добавленных позиций</p>
          <span class="cart__empty-text">Перейдите в каталог, чтобы добавить товары в корзину</span>
        </div>
        <div class="cart__empty-img">
          <img
            src="../../assets/images/empty-cart.png"
            alt=""
            width="452"
            height="454"
            loading="lazy"
          />
        </div>
      </div>
    </template>

    <template #content>
      <CardPopup
        v-for="item in cartItemsWithDetails"
        :key="item.id"
        :item="item"
        @remove="removeItem"
      />
    </template>
  </BaseCartPage>
</template>

<script>

import CardPopup from '@/entities/cart/CardPopup.vue'
import { useCartStore } from '@/shared/stores/cart.js'
import { useCatalogStore } from '@/shared/stores/catalog.js'

import BaseCartPage from '@/shared/layouts/BaseCartPage.vue'

export default {
  name: 'CartPage',
  components: {
    BaseCartPage,
    CardPopup,
  },
  data() {
    return {
      cartStore: null,
      callbackPopupVisible: false,
      successPopupVisible: false,
    }
  },
  created() {
    this.cartStore = useCartStore()
  },
  computed: {
    cartItems() {
      return this.cartStore.cartItems
    },
    cartItemsWithDetails() {
      const cartStore = useCartStore()
      const catalogStore = useCatalogStore()
      return cartStore.cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        product: catalogStore.getProductById(item.id) || {},
      }))
    },
    totalQuantity() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0)
    },
    totalSum() {
      return this.cartItemsWithDetails.reduce((total, item) => {
        const price = item.product.price || 0
        return total + price * item.quantity
      }, 0)
    },
    formattedTotalSum() {
      return this.totalSum.toLocaleString('ru-RU')
    },
  },
  methods: {
    removeItem(productId) {
      this.cartStore.cartItems = this.cartStore.cartItems.filter((item) => item.id !== productId)
      this.cartStore.saveCart()
    },
    declineItems(count) {
      if (count % 10 === 1 && count % 100 !== 11) return 'товар'
      if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'товара'
      return 'товаров'
    },
    openCallbackPopup() {
      this.callbackPopupVisible = true
    },
    closeCallbackPopup() {
      this.callbackPopupVisible = false
    },
    closeSuccessPopup() {
      this.successPopupVisible = false
    },
    openSuccessPopup() {
      this.successPopupVisible = true
    },
  },
}
</script>
<style lang="scss">

</style>
