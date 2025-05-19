<template>
  <div class="subscribe">
    <h3 class="subscribe__title">Будь в курсе акций!</h3>
    <form class="subscribe__form" novalidate @submit.prevent="submitSubscribeForm">
      <label class="subscribe__label">
        <input
          class="subscribe__input"
          :class="{ error: errors.email }"
          type="email"
          v-model.trim="formSubscribe.email"
          required
          placeholder="Введите ваш e-mail"
        />
        <span v-if="errors.email" class="subscribe__error">{{ errors.email }}</span>
      </label>
      <label class="subscribe__label subscribe__label--checkbox">
        <input
          type="checkbox"
          v-model="formSubscribe.checkbox"
          :class="{ error: errors.checkbox }"
          required
        />
        <p>Я согласен/на на обработку персональных данных</p>
        <span v-if="errors.checkbox" class="subscribe__error">{{ errors.checkbox }}</span>
      </label>
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
    gap: 20px;
  }

  &__label {
    position: relative;
  }

  &__input {
    width: 100%;
    padding: 16px;
    border-radius: 500px;
    background-color: var(--blue-0);
    border: 1px solid transparent;
    font-size: 14px;
    color: var(--black);

    &::placeholder {
      font-size: 14px;
      color: var(--blue-300);
    }

    &.error {
      border-color: var(--red);
    }
  }

  &__label--checkbox {
    display: flex;
    gap: 8px;
    align-items: center;

    p {
      margin: 0;
      color: var(--grey-200);
    }

    input {
      &.error {
        border-color: var(--red);
      }
    }
  }

  &__error {
    position: absolute;
    bottom: -13px;
    left: 16px;
    color: var(--red);
    font-size: 10px;
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
