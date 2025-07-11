<template>
  <div class="cart" :class="`cart--${theme}`">
    <IntroPages :title="title" />
    <div class="container">
      <slot name="cart-empty"></slot>
      <div class="cart__content">
        <div class="cart__wrapper">
          <slot name="content"></slot>
        </div>
        <div class="cart__wrapper cart__wrapper--info" v-if="cartItems.length > 0">
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
            <ContactsPageBlock />
          </div>
        </div>
      </div>
    </div>
  </div>
  <CallbackSection v-if="cartItems.length > 0" />
</template>

<script>
import IntroPages from '@widgets/intro-pages/IntroPages.vue'
import { useCartStore } from '@/shared/stores/cart.js'
import { useCatalogStore } from '@/shared/stores/catalog.js'
// import { usePopupStore } from '@/shared/stores/popup.js'
import CallbackSection from '@/widgets/callback-section/CallbackSection.vue'

export default {
  name: 'BaseCartPage',
  components: {
    IntroPages,
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
    }
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
    // openCallbackPopup() {
    //   const popupStore = usePopupStore()
    //   popupStore.showPopup({
    //     component: 'CallbackPopup',
    //     props: { isVisible: true, redirectTo: this.$route.path },
    //   })
    // },
    goToOrder() {
      this.$router.push('/order')
    },
  },
  created() {
    this.cartStore = useCartStore()
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.cart {
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 3vw, 70px);
  margin-bottom: var(--section-offset);

  &__empty {
    display: flex;
    justify-content: space-between;
    gap: 32px;
  }

  // &__empty-wrapper {
  //   align-self: center;
  // }

  // &__empty-title {
  //   margin-bottom: 24px;
  //   font-weight: 500;
  //   @include fluid-text(56, 24);
  //   line-height: 110%;
  //   letter-spacing: -0.04em;
  //   color: var(--blue);
  // }

  // &__empty-text {
  //   font-weight: 500;
  //   font-size: 16px;
  //   color: var(--grey-200);
  // }

  &__empty-img {
    max-width: 30%;
    width: 100%;
    margin-right: 5%;
    transform: rotate(10deg);

    @include mobile {
      display: none;
    }

    img {
      object-fit: cover;
      object-position: center;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1.7fr 1fr;
    gap: 16px;

    @include tablet-bottom {
      grid-template-columns: 1fr;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &--info {
      @include tablet-bottom {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      @include mobile {
        display: flex;
        flex-direction: column;
      }
    }
  }

  &__total,
  &__contacts {
    background-color: var(--blue-0);
    border-radius: var(--br-block);
  }

  &__total {
    padding: 36px 44px;
    display: flex;
    flex-direction: column;
    gap: 30px;

    @include laptop {
      padding: 24px 32px;
    }

    @include tablet {
      padding: 16px 28px;
      gap: 20px;
    }

    @include mobile {
      padding: 14px 20px;
    }

    .base-button {
      width: 100%;
    }
  }

  &__total-text {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 8px;
  }

  &__total-title {
    font-weight: 600;
    @include fluid-text(20, 10);
    color: var(--blue-300);
  }

  &__total-quantity {
    font-weight: 500;
    @include fluid-text(20, 10);
  }

  &__total-sum {
    grid-row: 3 / -1;
    grid-column: 2 / 3;
    justify-self: flex-end;
    font-weight: 500;
    @include fluid-text(48, 28);
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__contacts {
    padding: 36px 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @include laptop {
      padding: 24px 32px;
    }

    @include tablet {
      padding: 16px 28px;
      gap: 14px;
    }

    @include mobile {
      padding: 14px 20px;
    }

    .contacts-block {
      gap: 12px;

      @include laptop-bottom {
        gap: 8px;
      }
    }

    .contacts-block__item {
      @include fluid-text(16, 10);
    }
  }

  &__contacts-text {
    font-weight: 500;
    @include fluid-text(20, 10);
    color: var(--blue-300);
  }

  &--order {
    .intro-pages {
      grid-template-columns: 1fr;
    }

    .cart__content {
      @include tablet-bottom {
        grid-template-columns: 1.7fr 1fr;
        gap: 12px;
      }

      @include mobile {
        display: flex;
        flex-direction: column;
        gap: 32px;
      }
    }
    .cart__wrapper {
      max-width: clamp(410px, 52vw, 860px);
      width: 100%;

      @include mobile {
        max-width: 100%;
      }

      // &--delivery {
      //   width: 100%;
      // }

      &--info {
        @include tablet-bottom {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
</style>
