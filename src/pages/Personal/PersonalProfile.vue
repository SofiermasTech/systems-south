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
          />
          <BaseInput
            type="text"
            placeholder="Фамилия"
            required
            v-model="form.surname"
            :error="errors.surname"
            @input="validateField('surname')"
          />
          <BaseInput
            type="email"
            placeholder="E-mail"
            required
            v-model="form.email"
            :error="errors.email"
            @input="validateField('email')"
          />
          <BaseInput
            type="tel"
            placeholder="Телефон"
            required
            v-model="form.tel"
            :error="errors.tel"
            @input="validateField('tel')"
          />
        </div>
      </fieldset>
      <fieldset class="order-form__fieldset">
        <legend class="order-form__title">Данные пользователя</legend>
        <div class="order-form__wrapper">
          <BaseInput
            type="tel"
            placeholder="Введите текущий пароль"
            v-model="form.password"
            :error="errors.password"
            @input="validateField('password')"
          />
        </div>
      </fieldset>
    </form>
  </section>
</template>

<script>
import { useAuthStore } from '@/shared/stores/auth'

export default {
  name: 'PersonalProfile',
  data() {
    return {
      form: {
        name: '',
        surname: '',
        email: '',
        tel: '',
        password: '',
      },
      errors: {
        name: '',
        surname: '',
        email: '',
        tel: '',
        password: '',
      },
      authStore: useAuthStore(),
    }
  },
  mounted() {
    // Перенаправление, если не авторизован
    // if (!this.authStore.isLoggedIn) {
    //   this.$router.push({ name: 'HomePage' })
    //   return
    // }

    const user = this.authStore.getUser
    if (user) {
      this.form = {
        name: user.name || '',
        surname: user.surname || '',
        email: user.email || '',
        tel: user.phone || '',
        password: '',
      }
    }
  },
}
</script>
<style lang="scss">
.profile {
  max-width: 75%;
  width: 100%;

  .base-input-label::after {
    content: '';
    width: 40px;
    height: 40px;
    background-color: var(--blue);
    border-radius: 50%;
    position: absolute;
    top: 4px;
    right: 8px;
    background-image: url('@/assets/images/icons/edit-icon.svg');
    background-repeat: no-repeat;
    background-size: 15px;
    background-position: center;
  }
}
</style>
