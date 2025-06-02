<template>
  <BasePopup
    :title="currentForm === 'login' ? 'Вход в аккаунт' : 'Регистрация'"
    :is-visible="isVisible"
    :custom-class="currentForm === 'login' ? 'login-popup' : 'reg-popup'"
    @close-popup="closePopup"
  >
    <template v-if="currentForm === 'registration'" #subtitle>
      <p class="reg-popup__subtitle">
        Для подтверждения почты, вам будет выслана ссылка. Пожалуйста, проверьте свой почтовый адрес
        и перейдите по ней
      </p>
    </template>
    <template #popup-content>
      <BaseForm
        :fields="currentFields"
        @close-popup="closePopup"
        @submit-success="handleSubmitSuccess"
        :button-text="currentForm === 'login' ? 'Войти' : 'Отправить'"
      />
      <button
        class="login-popup__btn-reg"
        type="button"
        @click="toggleForm"
      >
        {{ currentForm === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
      </button>
    </template>
  </BasePopup>
</template>

<script>
export default {
  name: 'LoginPopup',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close-popup', 'submit-success'],
  data() {
    return {
      currentForm: 'login',
      loginFields: [
        { name: 'email', type: 'email', placeholder: 'E-mail', required: true },
        { name: 'password', type: 'password', placeholder: 'Пароль', required: true },
      ],
      registrationFields: [
        { name: 'name', type: 'text', placeholder: 'Имя', required: true },
        { name: 'email', type: 'email', placeholder: 'E-mail', required: true },
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
        { name: 'password', type: 'password', placeholder: 'Пароль', required: true },
        {
          name: 'checkbox',
          type: 'checkbox',
          required: true,
          label: 'Я согласен/на на обработку персональных данных',
        },
      ],
    };
  },
  computed: {
    currentFields() {
      return this.currentForm === 'login' ? this.loginFields : this.registrationFields;
    },
  },
  methods: {
    closePopup() {
      this.$emit('close-popup');
    },
    handleSubmitSuccess() {
      this.$emit('submit-success');
    },
    toggleForm() {
      this.currentForm = this.currentForm === 'login' ? 'registration' : 'login';
    },
  },
};
</script>

<style lang="scss">
.login-popup {
  &__btn-reg {
    width: 100%;
    padding-top: 20px;
    background-color: transparent;
    border: none;
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    color: var(--blue);
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
  }

  .popup-form {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .base-input-label.base-input-label--checkbox,
    .popup-form__btn-submit.base-button {
      grid-column: span 2;
    }
  }
}
</style>
