<template>
  <div class="subscribe">
    <h3 class="subscribe__title">Будь в курсе акций!</h3>
    <form class="subscribe__form" novalidate @submit.prevent="submitSubscribeForm">
      <label class="subscribe__label">
        <input
          class="subscribe__input"
          type="email"
          v-model="formSubscribe.email"
          required
          placeholder="Введите ваш e-mail"
        />
        <span v-if="errors.email" class="subscribe__error">{{ errors.email }}</span>
      </label>
      <label class="subscribe__label subscribe__label--checkbox">
        <input type="checkbox" v-model="formSubscribe.checkbox" required />
        <p>Я согласен/на на обработку персональных данных</p>
        <span v-if="errors.checkbox" class="subscribe__error">{{ errors.checkbox }}</span>
      </label>
      <button
        class="subscribe__btn-submit base-button"
        type="submit"
        @submit.prevent
        :disabled="!isFormValid || isSubmitting"
        :aria-disabled="!isFormValid || isSubmitting"
      >
        Отправить
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
    }
  },
  methods: {
    submitSubscribeForm() {
      this.errors = { email: '', checkbox: '' }

      // Валидация
      if (!this.isFormValid) {
        if (!this.formSubscribe.email.trim()) this.errors.email = 'Введите email'
        if (
          this.formSubscribe.email.trim() &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formSubscribe.email)
        ) {
          this.errors.email = 'Некорректный email'
        }
        if (!this.formSubscribe.checkbox) this.errors.checkbox = 'Необходимо согласие'
        return
      }
      // Если валидация пройдена
      console.log('Отправка данных:', this.formSubscribe)
      this.isSubmitting = true
    },
  },
  computed: {
    isFormValid() {
      const isEmailValid =
        this.formSubscribe.email.trim() !== '' &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formSubscribe.email)
      return this.formSubscribe.checkbox && isEmailValid
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

  &__label {
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
  }

  &__error {
    margin-left: 16px;
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
