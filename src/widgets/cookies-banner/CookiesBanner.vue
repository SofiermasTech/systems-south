<template>
  <div v-if="isVisible" class="cookies-banner">
    <div class="container">
      <div class="cookies-banner__content">
        <div class="cookies-banner__text">
          <p>
            Мы используем cookies, чтобы сделать сайт удобнее. Нажимая на кнопку “Принять”, вы
            соглашаетесь с этим
          </p>
        </div>
        <div class="cookies-banner__btns">
          <base-button class="cookies-banner__disagree" @click="declineCookies">
            <span>Отклонить</span>
          </base-button>
          <base-button class="cookies-banner__agree" @click="acceptCookies">
            <span>Принять</span>
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CookiesBanner',
  data() {
    return {
      isVisible: false,
      storageKey: 'cookiesConsent',
    }
  },
  methods: {
    acceptCookies() {
      localStorage.setItem(this.storageKey, 'true')
      this.isVisible = false
      console.log('[CookiesBanner] Cookies accepted')
    },
    declineCookies() {
      localStorage.setItem(this.storageKey, 'false')
      this.isVisible = false // Скрываем баннер
      console.log('[CookiesBanner] Cookies declined')
    },
  },
  mounted() {
    // Проверяем, есть ли уже выбор пользователя в localStorage
    const consent = localStorage.getItem(this.storageKey)
    if (consent === null) {
      this.isVisible = true
    } else if (consent === 'false') {
      this.isVisible = true
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.cookies-banner {
  width: 100vw;
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 223;

  &__content {
    width: 100%;
    padding: 12px 24px;
    border-radius: var(--br-btn);
    background-color: var(--white);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    box-shadow: 0 8px 32px 0 rgba(35, 37, 38, 0.04);

    @include mobile {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__text {
    p {
      margin: 0;
      font-weight: 500;
      @include fluid-text(16, 10);
    }
  }

  &__btns {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 16px;

    @include tablet-bottom {
      gap: 8px;
    }
  }

  &__disagree {
    &.base-button {
      border: 1px solid var(--blue-100);
      background-color: var(--white);
      color: var(--blue);
    }
  }
}
</style>
