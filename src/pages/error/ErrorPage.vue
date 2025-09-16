<template>
  <section class="error-page">
    <div class="container">
      <div class="error-page__body">
        <p class="error-page__title">Страница не найдена</p>
        <p class="error-page__text">Возможно, она была удалена или перемещена</p>
        <img src="@/assets/images/err.png" alt="" width="800" height="400" />
        <base-button class="error-page__button" @click="goToHome">
          <span>На главную</span>
        </base-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ErrorPage',
  methods: {
    goToHome() {
      this.$router.push({ name: 'HomePage' })
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.error-page {
  width: 100vw;
  height: 100vh;

  .container {
    height: 100%;
  }

  &__body {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    @include tablet {
      gap: 12px;
    }
  }

  &__title {
    font-weight: 500;
    @include fluid-text(32, 16);
    color: var(--blue);
  }

  &__text {
    font-weight: 500;
    @include fluid-text(20, 10);
    text-align: center;
    color: var(--grey-200);
  }
}
</style>
