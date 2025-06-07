<template>
  <BasePopup :is-visible="true">
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
        @close-popup="closePopup"
        @submit-success="handleSubmitSuccess"
      />
    </template>
  </BasePopup>
</template>

<script>
export default {
  name: 'CallbackPopup',
  methods: {
    closePopup() {
      this.$emit('close-popup')
    },
    handleSubmitSuccess() {
      this.$emit('submit-success')
    },
  },
}
</script>

<style lang="scss"></style>
