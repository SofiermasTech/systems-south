<template>
  <div class="base-popup" v-if="isVisible">
    <div class="base-popup__overlay" @click="closePopup">
      <div class="base-popup__body" @click.stop>
        <div class="base-popup__content">
          <BaseButtonClosePopup @click="closePopup" />
          <h2 class="base-popup__title">{{ title }}</h2>
          <slot
            name="popup-content"
            @close-popup="closePopup"
            @submit-success="handleSubmitSuccess"
          ></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButtonClosePopup from '@/shared/ui/BaseButtonClosePopup.vue'

export default {
  name: 'BasePopup',
  components: {
    BaseButtonClosePopup,
  },
  props: {
    title: {
      type: String,
      default: 'Введите данные',
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
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
.base-popup {
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
    max-height: 470px;
    height: auto;
    padding: 40px;
    background-color: var(--white);
    border-radius: 16px;
    position: relative;
  }

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
