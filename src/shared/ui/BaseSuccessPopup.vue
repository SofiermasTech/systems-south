<template>
  <BasePopup :is-visible="isVisible" :class="'success-popup'">
    <template #popup-content>
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
        <h2 class="success-popup__title">{{ title }}</h2>
        <p class="success-popup__subtitle">{{ subtitle }}</p>
      </div>
      <base-button  class="success-popup__btn" type="button" @click="closePopup">
        {{ buttonText }}
      </base-button>
    </template>
  </BasePopup>
</template>

<script>
import { useCartStore } from '@/shared/stores/cart.js'
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'BaseSuccessPopup',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Успешно',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      cartStore: useCartStore(),
      popupStore: usePopupStore(),
    }
  },
  computed: {
    isOrderPage() {
      return this.$route.path.startsWith('/order')
    },
    buttonText() {
      return this.isOrderPage ? 'На главную' : 'ОК'
    },
  },
  methods: {
    // handleButtonClick() {
    //   this.$emit('close')

    //   if (this.isOrderPage) {
    //     this.$router.push({ name: 'HomePage' })
    //     this.cartStore.clearCart()
    //   }
    // },
    closePopup() {
      console.log('BaseSuccessPopup: Closing popup')
      this.popupStore.hidePopup()
      if (this.isOrderPage) {
        console.log('BaseSuccessPopup: Redirecting to /')
        this.$router.push('/')
        this.cartStore.clearCart()
      }
    },
  },
  mounted() {
    console.log('BaseSuccessPopup: Mounted with props', this.$props)
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.success-popup {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 111;

  .base-popup__body {
    max-width: clamp(335px, 24vw, 450px);
    max-height: 360px;

    @include mobile {
      max-width: 85%;
    }
  }

  .base-popup__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
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
    @include fluid-text(20, 14);
    text-align: center;
  }

  &__subtitle {
    @include fluid-text(16, 12);
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
