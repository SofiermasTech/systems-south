<template>
  <section class="callback-page">
    <div class="container">
      <div class="callback-page__body">
        <div class="callback-page__success" v-if="submitSuccess">
          <div class="callback-page__icon">
            <img
              src="@/assets/images/success-popup.png"
              alt=""
              width="102"
              height="96"
              loading="lazy"
            />
          </div>
          <div class="callback-page__text">
            <h2 class="callback-page__title">Заявка успешно оформлена!</h2>
            <p class="callback-page__subtitle">Наш менеджер свяжется с вами</p>
          </div>
        </div>
        <div class="callback-page__content" v-else>
          <h2 class="callback-page__content-title">
            Нужен совет?<br />
            Оставляйте заявку, мы поможем!
          </h2>
          <BaseForm :show-email="true" @submit-success="handleSubmitSuccess" />
        </div>
        <div class="callback-page__img">
          <img src="@/assets/images/callback-section-2.png" alt="" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CallbackSection',
  data() {
    return {
      submitSuccess: false,
    }
  },
  methods: {
    handleSubmitSuccess() {
      this.submitSuccess = true
    },
  },
}
</script>

<style lang="scss">
.callback-page {
  margin-bottom: var(--section-offset);
  background-image: linear-gradient(318deg, #fafcff 0%, #f2f7fd 100%);
  position: relative;

  &__body {
    min-height: 450px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    gap: 32px;
  }

  &__content {
    padding-block: 50px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    .popup-form {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .popup-form__label:first-child,
    .popup-form__label:last-child,
    .popup-form__btn-submit {
      grid-column: span 2;
    }

    .popup-form__input {
      background-color: var(--white);
    }
  }

  &__content-title {
    font-weight: 500;
    font-size: 48px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__img {
    max-width: 40%;
    width: 100%;

    img {
      width: 56%;
      object-fit: cover;
      position: absolute;
      bottom: 0;
    }
  }

  &__success {
    padding-block: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  &__icon {
  }

  &__text {
  }

  &__title {
    margin-bottom: 12px;
    font-weight: 500;
    font-size: 48px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__subtitle {
    font-size: 14px;
    text-align: center;
    color: var(--blue);
  }
}
</style>
