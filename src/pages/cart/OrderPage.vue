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
    onSubmitSuccess() {
      console.log('OrderPage: Получено submit-success')
      this.showSuccess = true
    },
    onCloseSuccess(value) {
      console.log('OrderPage: Закрываем попап, значение:', value)
      this.showSuccess = value
    },
  },
}
</script>

<style lang="scss"></style>
