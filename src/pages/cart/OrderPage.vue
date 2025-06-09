<template>
  <BaseCartPage
    title="Оформление заказа"
    theme="order"
    :show-success="showSuccess"
    @update:show-success="onCloseSuccess"
  >
    <template #content>
      <OrderForm @submit-success="onSubmitSuccess" />
    </template>
  </BaseCartPage>
</template>

<script>
import BaseCartPage from '@/shared/layouts/BaseCartPage.vue'
import OrderForm from '@/features/order-form/OrderForm.vue'
import { useOrderStore } from '@/shared/stores/order'
import { useAuthStore } from '@/shared/stores/auth'

export default {
  name: 'OrderPage',
  components: {
    BaseCartPage,
    OrderForm,
  },
  data() {
    return {
      showSuccess: false,
    }
  },
  methods: {
    async onSubmitSuccess(orderData) {
      console.log('OrderPage: Получено submit-success', orderData)
      const orderStore = useOrderStore()
      const authStore = useAuthStore()

      try {
        if (!authStore.isLoggedIn) {
          console.warn('Пользователь не авторизован, заказ не сохранён')
          this.showSuccess = true
          return
        }

        await orderStore.createOrder(orderData)
        this.showSuccess = true
      } catch (error) {
        console.error('Ошибка при создании заказа:', error)
      }
    },
    onCloseSuccess(value) {
      console.log('OrderPage: Закрываем попап, значение:', value)
      this.showSuccess = value
    },
  },
}
</script>

<style lang="scss"></style>
