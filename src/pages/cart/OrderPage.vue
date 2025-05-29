<template>
  <BaseCartPage title="Оформление заказа"  theme="order">
    <template #content>
      <OrderForm />
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
}
</script>

<style lang="scss">

</style>
