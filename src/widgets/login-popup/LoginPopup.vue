<template>
  <BasePopup
    :is-visible="isVisible"
    :custom-class="currentForm === 'login' ? 'login-popup' : 'reg-popup'"
    @close="closePopup"
  >
    <template #title>
      <h2 class="base-popup__title">
        {{ currentForm === 'login' ? 'Вход в аккаунт' : 'Регистрация' }}
      </h2>
    </template>
    <template v-if="currentForm === 'registration'" #subtitle>
      <p class="reg-popup__subtitle">
        Для подтверждения почты, вам будет выслана ссылка. Пожалуйста, проверьте свой почтовый адрес
        и перейдите по ней
      </p>
    </template>
    <template #popup-content>
      <div v-if="authStore.getError" class="form-error-message">{{ authStore.getError }}</div>
      <div v-if="isLoading" class="loading">Загрузка...</div>
      <BaseForm
        :fields="currentFields"
        :key="currentForm"
        ref="baseForm"
        @close="closePopup"
        @submit-success="handleSubmitSuccess"
        :button-text="currentForm === 'login' ? 'Войти' : 'Отправить'"
      />
      <button class="login-popup__btn-reg" type="button" @click="toggleForm">
        {{ currentForm === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
      </button>
    </template>
  </BasePopup>
</template>

<script>
import { useAuthStore } from '@/shared/stores/auth.js'
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'LoginPopup',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['submit-success'],
  data() {
    return {
      authStore: useAuthStore(),
      popupStore: usePopupStore(),
      isLoading: false,
      currentForm: 'login',
      loginFields: [
        { name: 'email', type: 'email', placeholder: 'E-mail', required: true },
        { name: 'password', type: 'password', placeholder: 'Пароль', required: true },
      ],
      registrationFields: [
        {
          name: 'firstName',
          type: 'text',
          placeholder: 'Имя',
          required: true,
          rules: [
            {
              validator: (value) => value.length >= 2,
              message: 'Имя должно содержать минимум 2 символа',
            },
            {
              validator: (value) => /^[a-zA-Zа-яА-Я]+$/.test(value),
              message: 'Имя может содержать только буквы',
            },
          ],
        },
        {
          name: 'lastName',
          type: 'text',
          placeholder: 'Фамилия',
          required: true,
          rules: [
            {
              validator: (value) => value.length >= 2,
              message: 'Поле должно содержать минимум 2 символа',
            },
            {
              validator: (value) => /^[a-zA-Zа-яА-Я]+$/.test(value),
              message: 'Поле может содержать только буквы',
            },
          ],
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'E-mail',
          required: true,
          rules: [
            {
              validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
              message: 'Email введен в неверном формате',
            },
          ],
        },
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
          name: 'password',
          type: 'password',
          placeholder: 'Пароль',
          required: true,
          rules: [
            {
              validator: (value) => value.length >= 8,
              message: 'Пароль должен содержать минимум 8 символов',
            },
            {
              validator: (value) => /[A-ZА-Я]/.test(value) && /[0-9]/.test(value),
              message: 'Пароль должен содержать хотя бы одну заглавную букву и одну цифру',
            },
          ],
        },
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Повторите пароль',
          required: true,
          rules: [
            {
              validator: (value, formData) => value === formData.password,
              message: 'Пароли не совпадают',
            },
          ],
        },
        {
          name: 'checkbox',
          type: 'checkbox',
          required: true,
          label: 'Я согласен/на на обработку персональных данных',
        },
      ],
    }
  },
  computed: {
    currentFields() {
      return this.currentForm === 'login' ? this.loginFields : this.registrationFields
    },
  },
  methods: {
    closePopup() {
      this.currentForm = 'login'
      this.authStore.clearError()
      this.popupStore.hidePopup()
    },
    async handleSubmitSuccess(formData) {
      console.log('Form data:', formData)
      try {
        this.isLoading = true
        if (this.currentForm === 'login') {
          await this.authStore.login(formData)
          this.$emit('submit-success')
          this.closePopup()
        } else {
          await this.authStore.register(formData)
          console.log('Registration successful')

          this.popupStore.showPopup('BaseSuccessPopup', {
            isVisible: true,
            title: 'Вы успешно зарегистрированы!',
          })
        }
      } catch (error) {
        console.error('Registration failed:', error)
        alert(this.authStore.getError)
      } finally {
        this.isLoading = false
      }
    },
    toggleForm() {
      this.authStore.clearError()
      this.currentForm = this.currentForm === 'login' ? 'registration' : 'login'

      if (this.$refs.baseForm) {
        this.$refs.baseForm.resetForm()
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.login-popup {
  &__btn-reg {
    width: 100%;
    padding-top: 20px;
    background-color: transparent;
    border: none;
    font-weight: 600;
    @include fluid-text(16, 12);
    text-align: center;
    color: var(--blue);

    @include tablet {
      padding-top: 16px;
    }
  }
}

.reg-popup {
  .base-popup__title {
    margin-bottom: 12px;
  }

  &__subtitle {
    margin-bottom: 32px;
    max-width: 460px;
    font-size: 14px;
    color: var(--grey-200);

    @include tablet {
      font-size: 12px;
      margin-bottom: 24px;
    }
  }

  .popup-form {
    display: grid;
    grid-template-columns: 1fr 1fr;

    @include mobile {
      grid-template-columns: 1fr;
    }

    .base-input-label.base-input-label--checkbox,
    .popup-form__btn-submit.base-button {
      grid-column: span 2;

      @include mobile {
        grid-column: span 1;
      }
    }
  }
}

.loading {
  font-size: 14px;
  color: var(--blue);
  margin-top: -20px;
  margin-bottom: 12px;
}

.form-error-message {
  font-size: 14px;
  color: var(--red);
  margin-top: -20px;
  margin-bottom: 12px;
}
</style>
