<template>
  <div class="success-popup" v-if="isVisible">
    <div class="success-popup__overlay" @click="closePopupSuccess">
      <div class="success-popup__body" @click.stop>
        <div class="success-popup__img">
          <img
            src="@/assets/images/success-popup.png"
            alt=""
            width="102"
            height="96"
            loading="lazy"
          />
        </div>
        <div class="success-popup__text">
          <h2 class="success-popup__title">Заявка успешно оформлена!</h2>
          <p class="success-popup__subtitle">Наш менеджер свяжется с вами</p>
        </div>
        <button
          class="success-popup__btn base-button"
          type="button"
          @click.prevent="closePopupSuccess"
        >
          ОК
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SuccessPopup',
   props: {
    isVisible: Boolean,
  },
  methods: {
    closePopupSuccess() {
      this.$emit('close-popup')
    },
  },
}
</script>
<style lang="scss">
.success-popup {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 111;

  &__overlay {
    width: 100%;
    height: 100%;
    background-color: var(--grey-300);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__body {
    max-width: 500px;
    width: 100%;
    max-height: 400px;
    height: 100%;
    padding: 40px;
    background-color: var(--white);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    position: relative;
  }

  &__img {
    width: 102px;
    height: 96px;

    img {
      object-fit: cover;
      object-position: center;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }

  &__title {
    font-weight: 500;
    font-size: 16px;
    text-align: center;
  }

  &__subtitle {
    font-size: 14px;
    text-align: center;
    color: var(--grey-200);
  }

  &__btn {
    &.base-button {
      max-width: 250px;
      width: 100%;
    }
  }
}
</style>
