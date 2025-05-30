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
          @click.prevent="goToMain"
          v-if="isOrderPage"
          class="success-popup__btn success-popup__btn--main base-button"
          type="button"
        >
          На главную
        </button>
        <button
          v-else
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
import { useCartStore } from '@/shared/stores/cart'

export default {
  name: 'SuccessPopup',
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      cartStore: null,
    }
  },
  created() {
    this.cartStore = useCartStore()
  },
  methods: {
    closePopupSuccess() {
      this.$emit('close-popup')

      if (this.$route.path.startsWith('/order')) {
        this.$router.push('/')
        this.cartStore.clearCart()
      }
    },
    goToMain() {
      this.closePopupSuccess()
      this.$router.push('/')
    },
    isOrderPage() {
      return this.$route.path.startsWith('/order')
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

    a {
      text-decoration: none;
      justify-content: center;
    }
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
