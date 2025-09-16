<template>
  <div class="email-confirmation">
    <h2>Подтверждение email</h2>
    <p v-if="isLoading">Подтверждение...</p>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success">Email успешно подтвержден! Перенаправляем...</p>
  </div>
</template>

<script>
import { useAuthStore } from '@/shared/stores/auth.js'
import { usePopupStore } from '@/shared/stores/popup.js'
import api from '@/api'

export default {
  name: 'EmailConfirmation',
  data() {
    return {
      authStore: useAuthStore(),
      popupStore: usePopupStore(),
      isLoading: true,
      error: '',
      success: false,
    }
  },
  async mounted() {
    const uuid = this.$route.params.uuid
    const newEmail = this.$route.query.email
    console.log('[EmailConfirmation] Processing uuid:', uuid, 'newEmail:', newEmail)
    if (!uuid) {
      this.error = 'Неверная ссылка подтверждения'
      this.isLoading = false
      return
    }
    try {
      console.log('[EmailConfirmation] Sending email confirmation:', { uuid })
      const response = await api.post('/client/email-confirmation', { uuid })
      console.log('[EmailConfirmation] Confirmation response:', response.data)

      if (newEmail) {
        this.authStore.user = {
          ...this.authStore.getUser,
          email: newEmail,
        }
        localStorage.setItem('authUser', JSON.stringify(this.authStore.user))
        console.log('[EmailConfirmation] Email updated in authStore:', this.authStore.user)
      }

      this.success = true
      // Перенаправляем на главную с параметром для показа попапа
      this.$router.push({
        name: 'HomePage',
        query: { emailConfirmed: 'true' },
      })
    } catch (error) {
      console.error('[EmailConfirmation] Error confirming email:', error.response?.data || error)
      this.error = error.response?.data?.message || 'Ошибка при подтверждении email'
      this.isLoading = false
    }
  },
}
</script>

<style lang="scss">
.email-confirmation {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
}
.error {
  color: red;
}
</style>
