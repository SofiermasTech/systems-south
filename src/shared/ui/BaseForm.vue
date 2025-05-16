<template>
  <form class="popup-form" @submit.prevent="submitForm" novalidate>
    <label class="popup-form__label">
      <input class="popup-form__input" type="text" v-model="form.name" required placeholder="Имя" />
      <span v-if="errors.name" class="popup-form__error">{{ errors.name }}</span>
    </label>
    <label class="popup-form__label" v-if="showEmail">
      <input
        class="popup-form__input"
        type="email"
        v-model="form.email"
        required
        placeholder="E-mail"
      />
      <span v-if="errors.email" class="popup-form__error">{{ errors.email }}</span>
    </label>
    <label class="popup-form__label">
      <input
        class="popup-form__input"
        type="tel"
        v-model="form.phone"
        required
        placeholder="Телефон"
      />
      <span v-if="errors.phone" class="popup-form__error">{{ errors.phone }}</span>
    </label>
    <label class="popup-form__label popup-form__label--checkbox">
      <input type="checkbox" v-model="form.checkbox" required />
      <p>Я согласен/на на обработку персональных данных</p>
      <span v-if="errors.checkbox" class="popup-form__error">{{ errors.checkbox }}</span>
    </label>
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

  &__label {
    width: 100%;
    position: relative;

    &--checkbox {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    &:not(.popup-form__label--checkbox)::after {
      content: '*';
      font-size: 14px;
      color: var(--blue);
      position: absolute;
      top: 8px;
      right: 20px;
    }

    p {
      font-size: 12px;
      color: var(--grey-200);
    }
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

  &__error {
    margin-left: 16px;
    color: var(--red);
    font-size: 10px;
  }

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
