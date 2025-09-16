<template>
  <section class="profile">
    <form class="order-form__form" @submit.prevent="submitForm" novalidate>
      <fieldset class="order-form__fieldset profile__wrapper">
        <legend class="order-form__title">Данные пользователя</legend>
        <div class="order-form__wrapper">
          <BaseInput
            type="text"
            placeholder="Имя"
            required
            v-model="form.firstName"
            :error="errors.firstName"
            @input="validateField('firstName')"
            @save="saveField('firstName', $event)"
          />
          <BaseInput
            type="text"
            placeholder="Фамилия"
            required
            v-model="form.lastName"
            :error="errors.lastName"
            @input="validateField('lastName')"
            @save="saveField('lastName', $event)"
          />
          <BaseInput
            type="email"
            placeholder="E-mail"
            required
            v-model="form.email"
            :error="errors.email"
            @input="validateField('email')"
            @click="openEmailChangePopup"
          />
          <BaseInput
            type="tel"
            placeholder="Телефон"
            required
            v-model="form.tel"
            :error="errors.tel"
            @input="validateField('tel')"
            @save="saveField('tel', $event)"
          />
        </div>
      </fieldset>
      <fieldset class="order-form__fieldset">
        <legend class="order-form__title">Изменение пароля</legend>
        <div class="order-form__wrapper">
          <div class="order-form__wrapper-passwords">
            <BaseInput
              type="password"
              placeholder="Введите текущий пароль"
              v-model="form.oldPassword"
              :error="errors.oldPassword"
              @input="validateField('oldPassword')"
            />
            <BaseInput
              type="password"
              placeholder="Введите новый пароль"
              v-model="form.newPassword"
              :error="errors.newPassword"
              @input="validateField('newPassword')"
            />
            <BaseInput
              type="password"
              placeholder="Повторите новый пароль"
              v-model="form.confirmNewPassword"
              :error="errors.confirmNewPassword"
              @input="validateField('confirmNewPassword')"
            />
            <button class="order-form__pass-reset" type="button" @click="openChangePassPopup">Забыли пароль?</button>
          </div>
        </div>
      </fieldset>
      <base-button
        type="submit"
        :disabled="!hasChanges || isSubmitting"
        :class="{ disabled: !hasChanges || isSubmitting }"
        ><span>Сохранить изменения</span></base-button
      >
    </form>
  </section>
</template>

<script>
import { useAuthStore } from '@/shared/stores/auth.js'
import { usePopupStore } from '@/shared/stores/popup.js'
// import EmailChangePopup from '@/widgets/email-change-popup/EmailChangePopup.vue'
import api from '@/api'

export default {
  name: 'PersonalProfile',
  components: {
    // EmailChangePopup,
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        tel: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      initialForm: {
        firstName: '',
        lastName: '',
        email: '',
        tel: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        tel: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      authStore: useAuthStore(),
      popupStore: usePopupStore(),
      isSubmitting: false,
    }
  },

  computed: {
    hasChanges() {
      return (
        this.form.firstName !== this.initialForm.firstName ||
        this.form.lastName !== this.initialForm.lastName ||
        this.form.email !== this.initialForm.email ||
        this.form.tel !== this.initialForm.tel ||
        this.form.oldPassword !== this.initialForm.oldPassword ||
        this.form.newPassword !== this.initialForm.newPassword ||
        this.form.confirmNewPassword !== this.initialForm.confirmNewPassword
      )
    },
  },
  watch: {
    hasChanges(newValue) {
      console.log('[watch] hasChanges:', newValue)
    },
  },
  methods: {
    validateField(field) {
      const value = this.form[field]
      this.errors[field] = ''

      if (this.required && !value) {
        this.errors[field] = 'Поле обязательно для заполнения'
        return
      }

      switch (field) {
        case 'firstName':
        case 'lastName':
          if (value.length < 2) {
            this.errors[field] = 'Должно быть минимум 2 символа'
          }
          break
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            this.errors[field] = 'Неверный формат email'
          }
          break
        case 'tel':
          if (!/^\+?\d{10,}$/.test(value)) {
            this.errors[field] = 'Номер должен содержать минимум 10 цифр'
          }
          break
        case 'oldPassword':
          if (this.form.newPassword && !value) {
            this.errors[field] = 'Введите текущий пароль'
          } else if (value && value.length < 6) {
            this.errors[field] = 'Пароль должен содержать минимум 6 символов'
          }
          break
        case 'newPassword':
          if (value && value.length < 6) {
            this.errors[field] = 'Пароль должен содержать минимум 6 символов'
          } else if (value && value === this.form.oldPassword) {
            this.errors[field] = 'Новый пароль не должен совпадать с текущим'
          }
          break
        case 'confirmNewPassword':
          if (this.form.newPassword && value !== this.form.newPassword) {
            this.errors[field] = 'Пароли не совпадают'
          }
          break
      }
    },
    async saveField(field, value) {
      if (field === 'email') {
        // Email обновляется через попап
        return
      }

      this.validateField(field)
      if (this.errors[field]) {
        return
      }

      try {
        const apiField = field === 'tel' ? 'phone' : field
        const updateData = { [apiField]: value }
        console.log('Отправляем данные в PATCH /api/client:', updateData)
        const response = await api.patch('/client', updateData)
        console.log('Ответ от сервера:', response.data, response.status)

        this.authStore.user = {
          ...this.authStore.getUser,
          ...response.data,
        }
        localStorage.setItem('authUser', JSON.stringify(this.authStore.user))

        this.errors[field] = ''
        console.log('Поле успешно обновлено:', field)
      } catch (error) {
        console.error('Ошибка при обновлении поля:', field, error.message)
        console.error('Ошибка.response:', error.response)
        this.errors[field] = 'Ошибка сохранения'
      }
    },
    async submitForm() {
      this.isSubmitting = true

      let hasUserDataChanges = false
      let hasPasswordChanges = false

      // Проверяем изменения в данных пользователя
      const userFields = ['firstName', 'lastName', 'tel']
      const changedUserData = {}
      userFields.forEach((field) => {
        if (this.form[field] !== this.initialForm[field]) {
          this.validateField(field)
          if (!this.errors[field]) {
            const apiField = field === 'tel' ? 'phone' : field
            changedUserData[apiField] = this.form[field]
            hasUserDataChanges = true
          }
        }
      })

      // Проверяем изменения в паролях
      if (this.form.newPassword || this.form.confirmNewPassword || this.form.oldPassword) {
        this.validateField('oldPassword')
        this.validateField('newPassword')
        this.validateField('confirmNewPassword')
        if (
          !this.errors.oldPassword &&
          !this.errors.newPassword &&
          !this.errors.confirmNewPassword
        ) {
          hasPasswordChanges = true
        }
      }

      if (
        this.errors.firstName ||
        this.errors.lastName ||
        this.errors.email ||
        this.errors.tel ||
        this.errors.oldPassword ||
        this.errors.newPassword ||
        this.errors.confirmNewPassword
      ) {
        this.isSubmitting = false
        return
      }

      try {
        // Сохраняем данные пользователя, если они изменились
        if (hasUserDataChanges) {
          console.log('[submitForm] Отправляем данные пользователя:', changedUserData)

          const response = await api.patch('/client', changedUserData)
          console.log('[submitForm] Ответ сервера (пользователь):', response.data)

          this.authStore.user = {
            ...this.authStore.getUser,
            ...response.data,
          }
          localStorage.setItem('authUser', JSON.stringify(this.authStore.user))
        }

        // Сохраняем пароль, если заполнены поля
        if (hasPasswordChanges) {
          console.log('[submitForm] Отправляем данные пароля:', {
            oldPassword: this.form.oldPassword,
            newPassword: this.form.newPassword,
          })
          await this.authStore.updatePassword({
            oldPassword: this.form.oldPassword,
            newPassword: this.form.newPassword,
          })

          // Очищаем поля паролей
          this.form.oldPassword = ''
          this.form.newPassword = ''
          this.form.confirmNewPassword = ''
          this.errors.oldPassword = ''
          this.errors.newPassword = ''
          this.errors.confirmNewPassword = ''
        }

        // Показываем попап в зависимости от типа изменений
        if (hasUserDataChanges) {
          this.popupStore.showPopup('BaseSuccessPopup', {
            isVisible: true,
            title: 'Данные успешно обновлены!',
            subtitle: 'Ваши личные данные сохранены',
          })
        } else if (hasPasswordChanges) {
          this.popupStore.showPopup('BaseSuccessPopup', {
            isVisible: true,
            title: 'Пароль успешно изменён!',
            subtitle: 'Ваши данные обновлены',
          })
        }

        // Если ничего не изменилось, показываем уведомление
        // if (!hasUserDataChanges && !hasPasswordChanges) {
        //   popupStore.showPopup('BaseSuccessPopup', {
        //     isVisible: true,
        //     title: 'Нет изменений',
        //     subtitle: 'Данные не были изменены',
        //   })
        //   this.isSubmitting = false
        //   return
        // }

        this.initialForm = { ...this.form }
      } catch (error) {
        console.error('[submitForm] Ошибка:', error)
        if (hasPasswordChanges && error.response?.status === 401) {
          this.errors.oldPassword = 'Неверный текущий пароль'
        } else {
          const errorMessage = hasPasswordChanges
            ? 'Ошибка при изменении пароля'
            : 'Ошибка при сохранении данных'
          this.errors[hasPasswordChanges ? 'newPassword' : 'email'] = errorMessage
        }
      } finally {
        this.isSubmitting = false
      }
    },
    openEmailChangePopup() {
      console.log('[PersonalProfile] Opening EmailChangePopup')
      this.popupStore.showPopup('EmailChangePopup', {
        isVisible: true,
        title: 'Введите новую почту',
        subtitle: 'Вам будет выслана ссылка для подтверждения вашей почты',
      })
    },
    openChangePassPopup() {
      console.log('[PersonalProfile] Opening EmailChangePopup')
      this.popupStore.showPopup('EmailChangePopup', {
        isVisible: true,
        title: 'Восстановление пароля',
        subtitle: 'На вашу почту будет выслана ссылка для восстановления пароля',
      })
    },
  },
  async mounted() {
    if (!this.authStore.isLoggedIn) {
      console.log('[PersonalProfile] User not logged in, redirecting to HomePage')
      this.$router.push({ name: 'HomePage' })
      return
    }

    try {
      console.log('[PersonalProfile] Accessing user data from authStore...')
      const user = this.authStore.getUser
      console.log('[PersonalProfile] User data from authStore:', user)

      if (user && user.id && user.email) {
        this.form = {
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          tel: user.phone || '',
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }
        this.initialForm = { ...this.form }
        console.log('[PersonalProfile] Form data:', this.form)
      } else {
        console.error('[PersonalProfile] Invalid user data:', user)
        this.errors.email = 'Ошибка загрузки данных пользователя'
      }
    } catch (error) {
      console.error('[PersonalProfile] Error accessing user data:', error)
      this.errors.email = error.response?.data?.message || 'Ошибка загрузки данных пользователя'
    }
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/utils.scss';

.profile {
  max-width: 75%;
  width: 100%;

   @include tablet {
    max-width: 85%;
  }

  @include tablet-bottom {
    max-width: 100%;
  }

  .order-form__wrapper-passwords {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;

    @include laptop-bottom {
      gap: 12px;
    }
  }

  .order-form__pass-reset {
    padding: 12px;
    background-color: transparent;
    border: none;
    font-weight: 600;
    @include fluid-text(14, 10);
    text-align: center;
    color: var(--blue);
  }

  .base-input-label::after {
    display: none;
  }

  .base-button {
    width: 100%;

    &.disabled {
      background-color: var(--blue-100);
      color: var(--blue-300);
    }
  }
}
</style>
