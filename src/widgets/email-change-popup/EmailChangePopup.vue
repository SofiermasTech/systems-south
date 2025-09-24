<template>
  <BasePopup :is-visible="isVisible" class="email-change-popup">
    <template #title>
      <h2 class="base-popup__title">{{ title }}</h2>
    </template>
    <template #subtitle>
      <p class="base-popup__subtitle">{{ subtitle }}</p>
    </template>
    <template #popup-content>
      <BaseForm
        :fields="[
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
        ]"
        @close="closePopup"
        @submit-success="handleSubmitSuccess"
        buttonText="Отправить ссылку"
        :form-data="formData"
      />
      <div v-if="error" class="form-error-message">{{ error }}</div>
    </template>
  </BasePopup>
</template>

<script>
import { usePopupStore } from '@/shared/stores/popup.js'
import { useAuthStore } from '@/shared/stores/auth.js'
// import api from '@/api'

export default {
  name: 'EmailChangePopup',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'reset',
    },
  },
  data() {
    return {
      isVisible: false,
      popupStore: usePopupStore(),
      authStore: useAuthStore(),
      formData: {
        email: '',
      },
      error: null,
    }
  },
  methods: {
    closePopup() {
      this.popupStore.hidePopup()
      this.formData.email = ''
      this.error = null
    },
    async handleSubmitSuccess(formData) {
      try {
        console.log('[EmailChangePopup] Sending request:', formData)
        if (this.mode === 'change' && !this.authStore.isLoggedIn) {
          throw new Error('Для смены email необходимо авторизоваться')
        }
        console.log('[EmailChangePopup] authStore:', this.authStore)
        let response
        if (this.mode === 'change') {
          response = await this.authStore.sendConfirmationLink(formData.email)
        } else if (this.mode === 'reset') {
          response = await this.authStore.restorePassword(formData.email)
        }

        console.log('[EmailChangePopup] Response from server:', response)
        this.closePopup()
        this.popupStore.showPopup('BaseSuccessPopup', {
          isVisible: true,
          title: 'Заявка успешно оформлена!',
          subtitle: 'Проверьте вашу почту',
        })

        // Для смены email эмулируем подтверждение (в реальном случае это отдельная страница)
        if (this.mode === 'change' && response.uuid) {
          console.log('[EmailChangePopup] Simulating email confirmation with uuid:', response.uuid)
          await this.authStore.confirmEmail(response.uuid, formData.email)
        }

        // this.closePopup()
      } catch (error) {
        console.error('[EmailChangePopup] Error sending request:', error.response?.data || error)
         if (error.response?.status === 400) {
          this.error = 'Введите новый email'
        }
        // this.error = error.response?.data?.message || error.message || 'Ошибка при отправке запроса'
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.email-change-popup {
  .base-popup__body {
    max-width: clamp(320px, 30vw, 450px);
  }
  .base-popup__title {
    @include fluid-text(24, 14);
    margin-bottom: clamp(10px, 1vw, 16px);
  }

  .base-popup__subtitle {
    margin-bottom: clamp(16px, 2.2vw, 24px);
    color: var(--grey-200);
    @include fluid-text(14, 10);
  }

  .base-input__btn-edit {
    display: none;
  }

  .form-error-message {
    margin-top: 8px;
    margin-bottom: 0;
  }
}
</style>
