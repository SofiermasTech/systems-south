<template>
  <div class="cart container">
    <IntroPages title="Корзина" />
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
    <div v-else class="cart__content">
      <div class="cart__wrapper">
        <CardPopup
          v-for="item in cartItemsWithDetails"
          :key="item.id"
          :item="item"
          @remove="removeItem"
        />
      </div>
      <div class="cart__wrapper">
        <div class="cart__total">
          <div class="cart__total-text">
            <p class="cart__total-title">Итого</p>
            <p class="cart__total-quantity">3 товара</p>
            <div class="cart__total-sum">18 742 ₽</div>
          </div>
          <base-button><span>Перейти к оформлению</span></base-button>
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
</template>

<script>
import IntroPages from '@widgets/intro-pages/IntroPages.vue'
import CardPopup from '@/entities/cart/CardPopup.vue'
import { useCartStore } from '@/shared/stores/cart.js'
import { useCatalogStore } from '@/shared/stores/catalog.js'

export default {
  name: 'CartPage',
  components: {
    IntroPages,
    CardPopup,
  },
  data() {
    return {
      cartStore: null,
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
  },
  methods: {
    removeItem(productId) {
      this.cartStore.cartItems = this.cartStore.cartItems.filter((item) => item.id !== productId)
      this.cartStore.saveCart()
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
}
</style>
