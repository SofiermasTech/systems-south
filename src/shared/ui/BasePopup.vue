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
    // modelValue: {
    //   type: Boolean,
    //   default: false,
    // },
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
@import '@/assets/styles/utils.scss';

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
    width: 100vw;
    height: 100%;
    background-color: var(--grey-300);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__body {
    max-width: clamp(335px, 27vw, 520px);
    width: 100%;
    max-height: 470px;
    height: auto;
    padding: clamp(20px, 2vw, 40px);
    background-color: var(--white);
    border-radius: var(--br-block);
    position: relative;

    @include mobile {
      max-width: 85%;
    }

    &.reg-popup {
      max-width: clamp(470px, 45vw, 820px);

      @include mobile {
        max-width: 85%;
      }
    }
  }

  &__title {
    margin-bottom: 36px;
    font-weight: 500;
    @include fluid-text(48, 24);
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);

    @include laptop-bottom {
      margin-bottom: 24px;
    }
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
