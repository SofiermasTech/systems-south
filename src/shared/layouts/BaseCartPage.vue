<template>
  <div class="cart container" :class="`cart--${theme}`">
    <IntroPages :title="title" />
    <slot name="cart-empty"></slot>
    <div class="cart__content">
      <div class="cart__wrapper">
        <slot name="content"></slot>
      </div>
      <div class="cart__wrapper" v-if="cartItems.length > 0">
        <div class="cart__total">
          <div class="cart__total-text">
            <p class="cart__total-title">Итого</p>
            <p class="cart__total-quantity">
              {{ totalQuantity }} {{ declineItems(totalQuantity) }}
            </p>
            <div class="cart__total-sum">{{ formattedTotalSum }} ₽</div>
          </div>
          <base-button v-if="isCartPage" @click="goToOrder"
            ><span>Перейти к оформлению</span></base-button
          >
        </div>
        <div class="cart__contacts">
          <p class="cart__contacts-text">
            Есть вопросы по заказу? Свяжитесь с нами и мы поможем оформить заказ
          </p>
          <ContactsPageBlock @open-popup="openCallbackPopup" />
        </div>
      </div>
    </div>
  </div>
  <CallbackPopup
    v-show="callbackPopupVisible"
    @close-popup="closeCallbackPopup"
    @submit-success="openSuccessPopup"
  />
  <BaseSuccessPopup
    :isVisible="showSuccess || successPopupVisible"
    @close-popup="closeSuccessPopup"
    :title="'Заявка успешно оформлена!'"
    :subtitle="'Наш менеджер свяжется с нами'"
  />

  <CallbackSection v-if="cartItems.length > 0" />
</template>

<script>
import IntroPages from '@widgets/intro-pages/IntroPages.vue'
import { useCartStore } from '@/shared/stores/cart'
import { useCatalogStore } from '@/shared/stores/catalog'
import CallbackPopup from '@/widgets/callback-popup/CallbackPopup.vue'
import BaseSuccessPopup from '@/shared/ui/BaseSuccessPopup.vue'
import CallbackSection from '@/widgets/callback-section/CallbackSection.vue'

export default {
  name: 'BaseCartPage',
  components: {
    IntroPages,
    CallbackPopup,
    BaseSuccessPopup,
    CallbackSection,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    showSuccess: {
      type: Boolean,
      default: false,
    },
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
    isCartPage() {
      return this.$route.path.startsWith('/cart')
    },
  },
  methods: {
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
      this.$emit('update:show-success', false)
    },
    openSuccessPopup() {
      console.log('BaseCartPage: Открываем SuccessPopup')
      this.successPopupVisible = true
    },
    goToOrder() {
      this.$router.push('/order')
    },
  },
}
</script>

<style lang="scss">
.cart {
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin-bottom: var(--section-offset);

  &__empty {
    display: flex;
    justify-content: space-between;
    gap: 32px;
  }

  &__empty-wrapper {
    align-self: center;
  }

  &__empty-title {
    margin-bottom: 24px;
    font-weight: 500;
    font-size: 48px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__empty-text {
    font-weight: 500;
    font-size: 16px;
    color: var(--grey-200);
  }

  &__empty-img {
    max-width: 30%;
    width: 100%;
    margin-right: 5%;
    transform: rotate(10deg);

    img {
      object-fit: cover;
      object-position: center;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1.7fr 1fr;
    gap: 16px;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__total,
  &__contacts {
    background-color: var(--blue-0);
    border-radius: 16px;
  }

  &__total {
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 30px;

    .base-button {
      width: 100%;
    }
  }

  &__total-text {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 8px;
  }

  &__total-title {
    font-weight: 600;
    font-size: 16px;
    color: var(--blue-300);
  }

  &__total-quantity {
    font-weight: 500;
    font-size: 16px;
  }

  &__total-sum {
    grid-row: 3 / -1;
    grid-column: 2 / 3;
    justify-self: flex-end;
    font-weight: 500;
    font-size: 40px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__contacts {
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .contacts-block {
      gap: 12px;
    }

    .contacts-block__item {
      font-weight: 600;
      font-size: 16px;
    }
  }

  &__contacts-text {
    font-weight: 500;
    font-size: 16px;
    color: var(--blue-300);
  }

  &--order {
    .cart__wrapper {
      max-width: 760px;
      width: 100%;
    }
  }
}
</style>
