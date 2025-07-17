<template>
  <BasePopup :is-visible="isVisible" class="email-change-popup">
    <template #title>
      <h2 class="base-popup__title">Введите новую почту</h2>
    </template>
    <template #subtitle>
      <p class="base-popup__subtitle">Вам будет выслана ссылка для подтверждения вашей почты</p>
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
    </template>
  </BasePopup>
</template>

<script>
import { usePopupStore } from '@/shared/stores/popup.js'
import { useAuthStore } from '@/shared/stores/auth.js'
import api from '@/api'

export default {
  name: 'EmailChangePopup',
  data() {
    return {
      isVisible: false,
      popupStore: usePopupStore(),
      authStore: useAuthStore(),
      formData: {
        email: '',
      },
    }
  },
  methods: {
    closePopup() {
      this.popupStore.hidePopup()
      this.formData.email = ''
    },
    async handleSubmitSuccess(formData) {
      try {
        console.log('[EmailChangePopup] Sending email change request:', formData)
        const response = await api.post('/client/send-confirmation-link', {
          newEmail: formData.email,
        })
        console.log('[EmailChangePopup] Response from server:', response.data)

        this.popupStore.showPopup('BaseSuccessPopup', {
          isVisible: true,
          title: 'Заявка успешно оформлена!',
          subtitle: 'Проверьте вашу почту',
        })

        // Для теста эмулируем подтверждение email
        // В реальном приложении пользователь переходит по ссылке, и uuid обрабатывается на отдельной странице
        if (response.data.uuid) {
          console.log(
            '[EmailChangePopup] Simulating email confirmation with uuid:',
            response.data.uuid,
          )
          await this.confirmEmail(response.data.uuid, formData.email)
        }

        this.closePopup()
      } catch (error) {
        console.error(
          '[EmailChangePopup] Error sending email change request:',
          error.response?.data || error,
        )
        this.error = error.response?.data?.message || 'Ошибка при отправке ссылки'
      }
    },
    async confirmEmail(uuid, newEmail) {
      try {
        console.log('[EmailChangePopup] Sending email confirmation:', { uuid })
        const response = await api.post('/client/email-confirmation', { uuid })
        console.log('[EmailChangePopup] Confirmation response:', response.data)

        // Обновляем email в authStore и localStorage
        this.authStore.user = {
          ...this.authStore.getUser,
          email: newEmail,
        }
        localStorage.setItem('authUser', JSON.stringify(this.authStore.user))
        console.log('[EmailChangePopup] Email updated in authStore:', this.authStore.user)
      } catch (error) {
        console.error('[EmailChangePopup] Error confirming email:', error.response?.data || error)
        this.error = error.response?.data?.message || 'Ошибка при подтверждении email'
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
}
</style>
