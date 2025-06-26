<template>
  <!-- <Transition :duration="{ enter: 700, leave: 300 }"> -->
  <div class="base-popup" v-show="isVisible">
    <div class="base-popup__overlay" @click="closePopup">
      <!-- <Transition :duration="{ enter: 700, leave: 300 }"> -->
      <div v-show="isVisible" class="base-popup__body" @click.stop :class="customClass">
        <div class="base-popup__content">
          <BaseButtonClosePopup @click="closePopup" />
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
          <slot
            name="popup-content"
            @close-popup="closePopup"
            @submit-success="handleSubmitSuccess"
          ></slot>
        </div>
      </div>
      <!-- </Transition> -->
    </div>
  </div>
  <!-- </Transition> -->
</template>

<script>
import BaseButtonClosePopup from '@/shared/ui/BaseButtonClosePopup.vue'
import { useCartStore } from '@/shared/stores/cart.js'
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'BasePopup',
  components: {
    BaseButtonClosePopup,
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
    animationType: {
      type: String,
      default: 'y',
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'close', 'submit-success'],
  data() {
    return {
      cartStore: useCartStore(),
      popupStore: usePopupStore(),
    }
  },
  computed: {
    // isVisible: {
    //   get() {
    //     return this.popupStore.isVisible || this.modelValue
    //   },
    //   set(value) {
    //     this.$emit('update:modelValue', value)
    //     if (!value) this.popupStore.hidePopup()
    //   },
    // },
  },
  methods: {
    closePopup() {
      this.popupStore.hidePopup()

      if (this.$route.path.startsWith('/order')) {
        this.$router.push('/')
        this.cartStore.clearCart()
      }
    },
    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.closePopup()
      }
    },
    handleSubmitSuccess() {
      this.$emit('submit-success')
    },
    isOrderPage() {
      return this.$route.path.startsWith('/order')
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

    &.reg-popup {
      max-width: 810px;
    }
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

.base-popup-enter-from,
.base-popup-leave-to {
  opacity: 0;
}
.base-popup-enter-active,
.base-popup-leave-active {
  transition: 0.3s ease;
}
.base-popup-enter-to,
.base-popup-leave-from {
  opacity: 1;
}

.base-popup-enter-from .base-popup__body {
  transform: translateX(-100%);
}
.base-popup-enter-active .base-popup__body,
.base-popup-leave-active .base-popup__body {
  transition: 0.7s ease;
}
.base-popup-enter-to .base-popup__body {
  transform: translateX(0);
}
</style>
