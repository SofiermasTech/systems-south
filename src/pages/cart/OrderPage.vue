<template>
  <BaseCartPage title="Оформление заказа" theme="order">
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
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'OrderPage',
  components: {
    BaseCartPage,
    OrderForm,
  },
  data() {
    return {
      // showSuccess: false,
      popupStore: usePopupStore(),
    }
  },
  methods: {
    async onSubmitSuccess(orderData) {
      // console.log('OrderPage: Получено submit-success', orderData)
      const orderStore = useOrderStore()
      const authStore = useAuthStore()

      try {
        if (!authStore.isLoggedIn) {
          console.warn('Пользователь не авторизован, заказ не сохранён')
          // this.showSuccess = true
          return
        }

        await orderStore.createOrder(orderData)
        // this.popupStore.showPopup('BaseSuccessPopup', {
        //   isVisible: true,
        //   title: 'Заявка успешно оформлена!',
        //   subtitle: 'Наш менеджер свяжется с вами',
        //   // redirectTo: this.$router.push('/'),
        // })
        // this.showSuccess = true
      } catch (error) {
        console.error('Ошибка при создании заказа:', error)
      }
    },

    // onCloseSuccess(value) {
    //   console.log('OrderPage: Закрываем попап, значение:', value)
    //   this.showSuccess = value
    // },
  },
}
</script>

<style lang="scss"></style>
