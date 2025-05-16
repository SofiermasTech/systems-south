<template>
  <div class="callback-popup">
    <div class="callback-popup__overlay" @click="closePopup">
      <div class="callback-popup__body" @click.stop>
        <div class="callback-form">
          <BaseButtonClosePopup @click="closePopup" />
          <h2 class="callback-form__title">Заказать звонок</h2>
          <BaseForm @close-popup="closePopup" @submit-success="handleSubmitSuccess" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButtonClosePopup from '@/shared/ui/BaseButtonClosePopup.vue'
export default {
  name: 'CallbackPopup',
  components: {
    BaseButtonClosePopup,
  },
  methods: {
    closePopup() {
      this.$emit('close-popup')
    },
    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.closePopup()
      }
    },
    handleSubmitSuccess() {
      this.$emit('submit-success')
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown)
  },
}
</script>

<style lang="scss">
.callback-popup {
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
    position: relative;
  }
}
.callback-form {
  &__title {
    margin-bottom: 36px;
    font-weight: 500;
    font-size: 40px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__btn {
  }
}
</style>
