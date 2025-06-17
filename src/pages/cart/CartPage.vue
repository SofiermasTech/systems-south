<template>
  <BaseCartPage title="Корзина" theme="default">
    <template #cart-empty>
      <div v-if="cartItems.length === 0" class="cart__empty">
        <BaseTitleEmptyPage
          :title="'В корзине нет добавленных позиций'"
          :subtitle="'Перейдите в каталог, чтобы добавить товары в корзину'"
        />
        <div class="cart__empty-img">
          <img
            src="@/assets/images/empty-cart.png"
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
import { useAuthStore } from '@/shared/stores/auth.js';
import BaseCartPage from '@/shared/layouts/BaseCartPage.vue'
import BaseTitleEmptyPage from '@/shared/ui/BaseTitleEmptyPage.vue'

export default {
  name: 'CartPage',
  components: {
    BaseCartPage,
    CardPopup,
    BaseTitleEmptyPage,
  },
  data() {
    return {
      cartStore: useCartStore(),
      catalogStore: useCatalogStore(),
      authStore: useAuthStore(),
    }
  },
  computed: {
    cartItems() {
      return this.cartStore.cartItems
    },
    cartItemsWithDetails() {
      return this.cartStore.cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        product: this.catalogStore.getProductById(item.id) || {},
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
      const targetCart = this.authStore.isLoggedIn ? this.cartStore.cartItems : this.cartStore.anonymousCart;
      const filteredCart = targetCart.filter((item) => item.id !== productId);
      if (this.authStore.isLoggedIn) {
        this.cartStore.cartItems = filteredCart;
      } else {
        this.cartStore.anonymousCart = filteredCart;
        this.cartStore.cartItems = filteredCart;
      }
      this.cartStore.persistCart();
    },
    declineItems(count) {
      if (count % 10 === 1 && count % 100 !== 11) return 'товар'
      if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'товара'
      return 'товаров'
    },
  },
}
</script>
<style lang="scss"></style>
