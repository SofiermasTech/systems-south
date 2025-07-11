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
            v-model="form.name"
            :error="errors.name"
            @input="validateField('name')"
            @save="saveField('name', $event)"
          />
          <BaseInput
            type="text"
            placeholder="Фамилия"
            required
            v-model="form.surname"
            :error="errors.surname"
            @input="validateField('surname')"
            @save="saveField('surname', $event)"
          />
          <BaseInput
            type="email"
            placeholder="E-mail"
            required
            v-model="form.email"
            :error="errors.email"
            @input="validateField('email')"
            @save="saveField('email', $event)"
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
              v-model="form.currentPassword"
              :error="errors.currentPassword"
              @input="validateField('currentPassword')"
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
import api from '@/api'

export default {
  name: 'PersonalProfile',
  data() {
    return {
      form: {
        name: '',
        surname: '',
        email: '',
        tel: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      initialForm: {
        name: '',
        surname: '',
        email: '',
        tel: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      errors: {
        name: '',
        surname: '',
        email: '',
        tel: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      authStore: useAuthStore(),
      isSubmitting: false,
    }
  },

  computed: {
    hasChanges() {
      return (
        this.form.name !== this.initialForm.name ||
        this.form.surname !== this.initialForm.surname ||
        this.form.email !== this.initialForm.email ||
        this.form.tel !== this.initialForm.tel ||
        this.form.currentPassword !== this.initialForm.currentPassword ||
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
        case 'name':
        case 'surname':
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
        case 'currentPassword':
          if (this.form.newPassword && !value) {
            this.errors[field] = 'Введите текущий пароль'
          } else if (value && value.length < 6) {
            this.errors[field] = 'Пароль должен содержать минимум 6 символов'
          }
          break
        case 'newPassword':
          if (value && value.length < 6) {
            this.errors[field] = 'Пароль должен содержать минимум 6 символов'
          } else if (value && value === this.form.currentPassword) {
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
      this.validateField(field)
      if (this.errors[field]) {
        return
      }

      try {
        const apiField = field === 'tel' ? 'phone' : field
        const updateData = { [apiField]: value }
        console.log('Отправляем данные в PUT /api/users/:id:', updateData)
        const response = await api.put(`/users/${this.authStore.getUser.id}`, updateData)
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
      const userFields = ['name', 'surname', 'email', 'tel']
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
      if (this.form.newPassword || this.form.confirmNewPassword || this.form.currentPassword) {
        this.validateField('currentPassword')
        this.validateField('newPassword')
        this.validateField('confirmNewPassword')
        if (
          !this.errors.currentPassword &&
          !this.errors.newPassword &&
          !this.errors.confirmNewPassword
        ) {
          hasPasswordChanges = true
        }
      }

      if (
        this.errors.name ||
        this.errors.surname ||
        this.errors.email ||
        this.errors.tel ||
        this.errors.currentPassword ||
        this.errors.newPassword ||
        this.errors.confirmNewPassword
      ) {
        this.isSubmitting = false
        return
      }

      const popupStore = usePopupStore()

      try {
        // Сохраняем данные пользователя, если они изменились
        if (hasUserDataChanges) {
          console.log('[submitForm] Отправляем данные пользователя:', changedUserData)
          const response = await api.put(`/users/${this.authStore.getUser.id}`, changedUserData)
          console.log('[submitForm] Ответ сервера (пользователь):', response.data)

          this.authStore.user = {
            ...this.authStore.getUser,
            ...response.data,
          }
          localStorage.setItem('authUser', JSON.stringify(this.authStore.user))

          popupStore.showPopup({
            component: 'BaseSuccessPopup',
            props: {
              isVisible: true,
              title: 'Данные успешно обновлены!',
              subtitle: 'Ваши личные данные сохранены',
            },
          })
        }

        // Сохраняем пароль, если заполнены поля
        if (hasPasswordChanges) {
          console.log('[submitForm] Отправляем данные пароля:', {
            currentPassword: this.form.currentPassword,
            newPassword: this.form.newPassword,
          })
          await this.authStore.updatePassword({
            currentPassword: this.form.currentPassword,
            newPassword: this.form.newPassword,
          })

          // Очищаем поля паролей
          this.form.currentPassword = ''
          this.form.newPassword = ''
          this.form.confirmNewPassword = ''
          this.errors.currentPassword = ''
          this.errors.newPassword = ''
          this.errors.confirmNewPassword = ''

          popupStore.showPopup({
            component: 'BaseSuccessPopup',
            props: {
              isVisible: true,
              title: 'Пароль успешно изменён!',
              subtitle: 'Ваши данные обновлены',
            },
          })
        }

        // Если ничего не изменилось, показываем уведомление
        if (!hasUserDataChanges && !hasPasswordChanges) {
          popupStore.showPopup({
            component: 'BaseSuccessPopup',
            props: {
              isVisible: true,
              title: 'Нет изменений',
              subtitle: 'Данные не были изменены',
            },
          })
          this.isSubmitting = false
          return
        }

        this.initialForm = { ...this.form }
      } catch (error) {
        console.error('[submitForm] Ошибка:', error)
        if (hasPasswordChanges && error.response?.status === 401) {
          this.errors.currentPassword = 'Неверный текущий пароль'
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
  },
  async mounted() {
    if (!this.authStore.isLoggedIn) {
      this.$router.push({ name: 'HomePage' })
      return
    }

    try {
      const users = await this.authStore.fetchUsers()
      const currentUserId = this.authStore.getUser.id
      const user = users.find((u) => u.id === currentUserId)

      if (user) {
        this.form = {
          name: user.name || '',
          surname: user.surname || '',
          email: user.email || '',
          tel: user.phone || '',
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }
        // Сохраняем исходные значения
        this.initialForm = { ...this.form }
      } else {
        console.error('Пользователь не найден в списке users[]')
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных пользователя:', error)
    }
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/utils.scss';

.profile {
  max-width: 75%;
  width: 100%;

  @include mobile {
    max-width: 100%;
  }

  .order-form__wrapper-passwords {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;

    @include laptop-bottom {
      gap: 8px;
    }
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
