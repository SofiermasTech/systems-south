<template>
  <form class="popup-form" @submit.prevent="submitForm" novalidate>
    <BaseInput type="text" placeholder="Имя" required v-model="form.name" :error="errors.name" />
    <BaseInput
      v-if="showEmail"
      type="email"
      placeholder="E-mail"
      required
      v-model="form.email"
      :error="errors.email"
    />
    <BaseInput
      type="tel"
      inputmode="tel"
      placeholder="Телефон"
      required
      v-model="form.phone"
      :error="errors.phone"
    />
    <base-input type="checkbox" required v-model="form.checkbox" :error="errors.checkbox">
      <template #label>
        <p>Я согласен/на на обработку персональных данных</p>
      </template>
    </base-input>
    <button
      class="popup-form__btn-submit base-button"
      type="submit"
      @submit.prevent
      :disabled="!isFormValid || isSubmitting"
      :aria-disabled="!isFormValid || isSubmitting"
    >
      Отправить
    </button>
  </form>
</template>

<script>
export default {
  name: 'BaseForm',
  props: {
    showEmail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        checkbox: false,
      },
      errors: {
        name: '',
        email: '',
        phone: '',
        checkbox: '',
      },
      isSubmitting: false,
    }
  },
  methods: {
    closePopup() {
      this.$emit('close-popup')
      this.resetForm()
    },
    submitForm() {
      this.errors = { name: '', email: '', phone: '', checkbox: '' }

      // Валидация
      if (!this.isFormValid) {
        if (!this.form.name.trim()) this.errors.name = 'Введите имя'
        if (this.showEmail && !this.form.email.trim()) this.errors.email = 'Введите email'
        if (
          this.showEmail &&
          this.form.email.trim() &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)
        ) {
          this.errors.email = 'Некорректный email'
        }
        if (!this.form.phone.trim()) this.errors.phone = 'Введите номер телефона'
        if (!this.form.checkbox) this.errors.checkbox = 'Необходимо согласие'
        return
      }
      // Если валидация пройдена
      console.log('Отправка данных:', this.form)
      this.isSubmitting = true
      // Пример отправки:
      // fetch('/api/callback', {
      //   method: 'POST',
      //   body: JSON.stringify(this.form),
      //   headers: { 'Content-Type': 'application/json' },
      // });
      this.closePopup()
      this.$emit('submit-success')
    },
    resetForm() {
      this.form = { name: '', email: '', phone: '', checkbox: false }
      this.errors = { name: '', email: '', phone: '', checkbox: '' }
      this.isSubmitting = false
    },
  },
  computed: {
    isFormValid() {
      const isEmailValid =
        !this.showEmail ||
        (this.form.email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email))
      return (
        this.form.name.trim() !== '' &&
        this.form.phone.trim() !== '' &&
        this.form.checkbox &&
        isEmailValid
      )
    },
  },
}
</script>

<style lang="scss">
.popup-form {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__btn-submit {
    margin-top: 12px;
    flex-grow: 1;
    width: 100%;

    &:disabled {
      background-color: var(--blue-100);
      color: var(--blue-300);
      cursor: not-allowed;
    }
  }
}
</style>
