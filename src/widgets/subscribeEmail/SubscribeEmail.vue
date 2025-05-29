<template>
  <div class="subscribe">
    <h3 class="subscribe__title">Будь в курсе акций!</h3>
    <form class="subscribe__form" novalidate @submit.prevent="submitSubscribeForm">
      <BaseInput
        type="email"
        placeholder="Введите ваш e-mail"
        required
        v-model.trim="formSubscribe.email"
        :error="errors.email"
      />
      <base-input
        type="checkbox"
        required
        v-model="formSubscribe.checkbox"
        :error="errors.checkbox"
      >
        <template #label>
          <p>Я согласен/на на обработку персональных данных</p>
        </template>
      </base-input>
      <button
        class="subscribe__btn-submit base-button"
        type="submit"
        :disabled="isSubmitting"
        :aria-disabled="!isFormValid || isSubmitting"
      >
        {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SubscribeEmail',
  data() {
    return {
      formSubscribe: {
        email: '',
        checkbox: false,
      },
      errors: {
        email: '',
        checkbox: '',
      },
      isSubmitting: false,
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      messages: {
        emailRequired: 'Введите email',
        emailInvalid: 'Некорректный email',
        checkboxRequired: 'Необходимо согласие',
        submitError: 'Ошибка при отправке. Попробуйте снова.',
        success: 'Вы успешно подписались!',
      },
    }
  },
  methods: {
    submitSubscribeForm() {
      const isEmailValid =
        this.formSubscribe.email !== '' && this.emailRegex.test(this.formSubscribe.email)
      const isCheckboxValid = this.formSubscribe.checkbox

      if (!this.formSubscribe.email) {
        this.errors.email = this.messages.emailRequired
      } else if (!this.emailRegex.test(this.formSubscribe.email)) {
        this.errors.email = this.messages.emailInvalid
      }
      if (!this.formSubscribe.checkbox) {
        this.errors.checkbox = this.messages.checkboxRequired
      }

      if (!isEmailValid || !isCheckboxValid) {
        return
      }
      // Если валидация пройдена
      console.log('Отправка данных:', this.formSubscribe)
      this.isSubmitting = true

      setTimeout(() => {
        this.resetForm()
      }, 1500)
    },
    resetForm() {
      this.formSubscribe = { email: '', checkbox: false }
      this.errors = { email: '', checkbox: '' }
      this.isSubmitting = false
    },
  },
  computed: {
    isFormValid() {
      const isEmailValid =
        this.formSubscribe.email.trim() !== '' && this.emailRegex.test(this.formSubscribe.email)
      return this.formSubscribe.checkbox && isEmailValid
    },
  },
  watch: {
    'formSubscribe.email'(newValue) {
      this.errors.email = ''
      if (newValue.trim() && !this.emailRegex.test(newValue)) {
        this.errors.email = this.messages.emailInvalid
      }
    },
    'formSubscribe.checkbox'(newValue) {
      this.errors.checkbox = newValue ? '' : this.messages.checkboxRequired
    },
  },
}
</script>

<style lang="scss">
.subscribe {
  max-width: 550px;
  width: 100%;

  &__title {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 28px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__btn-submit {
    &.base-button {
      margin-top: 12px;
      flex-grow: 1;
      width: 100%;
    }

    &:disabled {
      background-color: var(--blue-100);
      color: var(--blue-300);
      cursor: not-allowed;
    }
  }
}
</style>
