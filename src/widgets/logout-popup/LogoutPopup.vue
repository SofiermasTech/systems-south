<template>
  <BasePopup :is-visible="isVisible" :custom-class="'logout-popup'" @close="closePopup">
    <template #title>
      <h2 class="base-popup__title">Вы действительно хотите выйти из аккаунта?</h2>
    </template>
    <template #popup-content>
      <div class="logout-popup__content">
        <p class="logout-popup__text">Все данные аккаунта будут сохранены</p>
        <div class="logout-popup__wrapper-btn">
          <base-button class="logout-popup__btn-close" @click="closePopup"
            ><span>Отменить</span></base-button
          >
          <base-button class="logout-popup__btn-out" @click="logout"
            ><span>Выйти</span></base-button
          >
        </div>
      </div>
    </template>
  </BasePopup>
</template>

<script>
import { useAuthStore } from '@/shared/stores/auth.js'

export default {
  name: 'LogoutPopup',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    redirectTo: {
      type: String,
      default: '/',
    },
  },
  emits: ['close'],
  data() {
    return {
      authStore: useAuthStore(),
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
    logout() {
      this.authStore.logout()
      this.$router.push({ name: 'HomePage' })
      this.closePopup()
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.logout-popup {
  &.base-popup__body {
    max-width: clamp(330px, 25vw, 450px);
  }
  .base-popup__title {
    max-width: 300px;
    margin-bottom: 12px;
    font-weight: 600;
    @include fluid-text(20, 14);
    line-height: 110%;
    color: var(--black);
  }

  &__text {
    margin-bottom: 24px;
    @include fluid-text(20, 14);
    line-height: 120%;
    color: var(--grey-200);
  }

  &__wrapper-btn {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    align-items: center;
  }

  &__btn-close {
    &.base-button {
      width: 100%;
      background-color: var(--white);
      border: 1px solid var(--blue-200);
      color: var(--black);
    }
  }

  &__btn-out {
    &.base-button {
      width: 100%;
      background-color: var(--red);
    }
  }
}
</style>
