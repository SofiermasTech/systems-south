<template>
  <section class="orders">
    <BaseTitleEmptyPage
      v-if="!hasOrders"
      :title="'История заказов отсутствует'"
      :subtitle="'Перейдите в каталог, чтобы добавить и заказать товары'"
    />
    <div v-if="hasOrders" class="orders__content">
      <div class="orders__content-head">
        <p class="orders__head-title">Номер заказа/Название</p>
        <p class="orders__head-title">Артикул</p>
        <p class="orders__head-title">Количество</p>
        <p class="orders__head-title">Дата заказа</p>
        <p class="orders__head-title">Итоговая сумма</p>
      </div>
      <div class="orders__content-orders">
        <BaseAccordion
          v-for="(order, index) in orders"
          :key="order.id"
          :item="order"
          :id="index"
          :customClass="'orders__accordion'"
        >
          <template #titles>
            <!-- <div class="orders__accordion-wrapper"> -->
            <p class="orders__accordion-title">{{ order.orderNumber }}</p>
            <p class="orders__accordion-title"></p>
            <p class="orders__accordion-title">{{ getTotalQuantity(order.items) }}</p>
            <p class="orders__accordion-title">{{ formatDate(order.orderDate) }}</p>
            <p class="orders__accordion-title">{{ formatPrice(order.totalAmount) }}</p>
            <!-- </div> -->
          </template>
          <template #content>
            <div class="orders__accordion-wrapper" v-for="item in order.items" :key="item.id">
              <div class="orders__accordion-item-wrapper">
                <p class="orders__accordion-item">{{ item.name.split(' ')[0] }}</p>
                <p class="orders__accordion-text">{{ item.name }}</p>
              </div>
              <p class="orders__accordion-item orders__accordion-item--article">
                {{ item.article || '-' }}
              </p>
              <p class="orders__accordion-item">{{ item.quantity }}</p>
              <p class="orders__accordion-item">{{ formatDate(order.orderDate) }}</p>
              <p class="orders__accordion-item">{{ item.price * item.quantity }}</p>
            </div>
          </template>
        </BaseAccordion>
      </div>
    </div>
  </section>
</template>

<script>
import BaseAccordion from '@/shared/ui/BaseAccordion.vue'
import BaseTitleEmptyPage from '@/shared/ui/BaseTitleEmptyPage.vue'
import { useOrderStore } from '@/shared/stores/order.js'
import { useAuthStore } from '@/shared/stores/auth.js'

export default {
  name: 'PersonalOrders',
  components: {
    BaseTitleEmptyPage,
    BaseAccordion,
  },
  data() {
    return {
      authStore: useAuthStore(),
    }
  },
  computed: {
    orders() {
      return useOrderStore().getOrders
    },
    hasOrders() {
      return useOrderStore().hasOrders
    },
    isLoading() {
      return useOrderStore().isOrdersLoading
    },
    error() {
      return useOrderStore().getOrderError
    },
  },
  methods: {
    async loadOrders() {
      const orderStore = useOrderStore()
      if (this.authStore.isLoggedIn) {
        await orderStore.fetchOrders()
      } else {
        this.$router.push({ name: 'Login' })
      }
    },
    getTotalQuantity(items) {
      return items.reduce((total, item) => total + item.quantity, 0)
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
    formatPrice(amount) {
      return `${amount.toLocaleString('ru-RU')} ₽`
    },
  },
  mounted() {
    //  Перенаправление, если не авторизован
    if (!this.authStore.isLoggedIn) {
      this.$router.push({ name: 'HomePage' })
      return
    }

    this.loadOrders()
  },
}
</script>
<style lang="scss">
.orders {
  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__content-head {
    background-color: var(--blue-0);
    border-radius: 500px;
    padding: 12px 32px;
    display: grid;
    grid-template-columns: 2.7fr 1.8fr 1fr 1fr 1fr 0.3fr;
    align-items: center;
    gap: 16px;
  }

  &__head-title {
    font-weight: 500;
    font-size: 14px;
    color: var(--blue);
  }

  &__content-orders {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__accordion {
    padding: 0;

    .accordion__heading {
      padding: 20px 32px;
      display: grid;
      grid-template-columns: 2.7fr 1.8fr 1fr 1fr 1fr 0.3fr;
      gap: 16px;
      border-radius: 16px;
    }

    .base-button-heading {
      width: 20px;
      height: 20px;
      justify-self: end;
      border: none;
      border-radius: 0;
      background-color: transparent;
    }

    .accordion__content {
      margin-right: 0;
      padding: 12px 32px;
      padding-top: 0;
      // display: grid;
      // grid-template-columns: 2.7fr 1.8fr 1fr 1fr 1fr 0.3fr;
      // gap: 12px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    &.accordion.opened {
      background-color: var(--white);
      border-color: var(--blue-0);

      .accordion__heading {
        background-color: var(--blue);
      }

      .orders__accordion-title {
        color: var(--white);
      }

      .base-button-heading {
        color: var(--white);
      }
    }
  }

  &__accordion-wrapper {
    display: grid;
    grid-template-columns: 2.7fr 1.8fr 1fr 1fr 1fr 0.3fr;
    gap: 16px;
  }

  &__accordion-title {
    font-weight: 600;
    font-size: 14px;
    color: #333;
  }

  &__accordion-item-wrapper {
    margin-right: 16px;
  }

  &__accordion-item {
    font-weight: 600;
    font-size: 14px;
    color: var(--black);

    &--article {
      font-weight: 400;
    }
  }

  &__accordion-text {
    margin-top: 8px;
    font-weight: 400;
    font-size: 14px;
    color: var(--grey-200);
  }
}
</style>
