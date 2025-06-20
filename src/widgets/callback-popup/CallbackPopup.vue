<template>
  <BasePopup v-model="isVisible">
    <template #title>
      <h2 class="base-popup__title">Заказать звонок</h2>
    </template>
    <template #popup-content>
      <BaseForm
        :fields="[
          { name: 'name', type: 'text', placeholder: 'Имя', required: true },
          {
            name: 'phone',
            type: 'tel',
            placeholder: 'Телефон',
            required: true,
            rules: [
              {
                validator: (v) => /^\+?\d{10,}$/.test(v),
                message: 'Номер должен содержать минимум 10 цифр',
              },
            ],
          },
          {
            name: 'checkbox',
            type: 'checkbox',
            required: true,
            label: 'Я согласен/на на обработку персональных данных',
          },
        ]"
        @close="closePopup"
        @submit-success="handleSubmitSuccess"
      />
    </template>
  </BasePopup>
</template>

<script>
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'CallbackPopup',
  // props: {
  //   isVisible: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  data() {
    return {
      isVisible: false,
      popupStore: usePopupStore(),
    }
  },
  methods: {
    closePopup() {
      this.popupStore.hidePopup()
    },
    handleSubmitSuccess() {
      this.popupStore.showPopup({
        component: 'BaseSuccessPopup',
        props: {
          isVisible: true,
          title: 'Заявка успешно оформлена!',
          subtitle: 'Наш менеджер свяжется с вами',
        },
      })
      // this.$emit('submit-success')
    },
  },
  created() {
    if (this.popupStore.getCurrentPopup?.component === 'CallbackPopup') {
      this.isVisible = true
    }
  },
}
</script>

<style lang="scss"></style>
