<template>
  <div class="personal-sidebar">
    <nav class="personal-sidebar__nav">
      <RouterLink
        v-if="authStore.isLoggedIn"
        :to="{ name: 'PersonalProfile' }"
        class="personal-sidebar__nav-item"
        active-class="personal-sidebar__nav-item--active"
      >
        Профиль
      </RouterLink>
      <RouterLink
        :to="{ name: 'PersonalFavorites' }"
        class="personal-sidebar__nav-item"
        active-class="personal-sidebar__nav-item--active"
      >
        Избранное
      </RouterLink>
      <RouterLink
        v-if="authStore.isLoggedIn"
        :to="{ name: 'PersonalOrders' }"
        class="personal-sidebar__nav-item"
        active-class="personal-sidebar__nav-item--active"
      >
        Заказы
      </RouterLink>
    </nav>
    <div class="personal-sidebar__log-out" v-if="authStore.isLoggedIn">
      <button class="personal-sidebar__btn" type="button" @click="openPopup">Выйти</button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/shared/stores/auth.js'

export default {
  name: 'PersonalSidebar',
  emits: ['logout-request'],
  data() {
    return {
      authStore: useAuthStore(),
    }
  },
  methods: {
    openPopup() {
      this.$emit('logout-request')
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.personal-sidebar {
  grid-area: sidebar;
  height: 70vh;
  padding: 8px;
  background-color: var(--blue-0);
  border-radius: var(--br-block);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__nav-item {
    border-radius: var(--br-btn);
    padding: 24px 12px 24px 32px;
    font-size: 14px;
    color: var(--black);
    text-decoration: none;
    cursor: pointer;

    &--active {
      background-color: var(--white);
      font-weight: 600;
      color: var(--blue);
    }

    @include hover {
      background-color: var(--white);
      font-weight: 600;
      color: var(--blue);
    }
  }

  &__log-out {
    margin-inline: 8px;
    margin-bottom: 16px;
  }

  &__btn {
    width: 100%;
    margin: 0 auto;
    border: 1px solid var(--red);
    border-radius: 500px;
    padding: 14px;
    background-color: var(--white);
    font-weight: 500;
    font-size: 12px;
    color: var(--red);
  }
}
</style>
