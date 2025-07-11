<template>
  <div class="contacts" :class="{ open: this.popupStore.currentPopupName !== null }">
    <div class="contacts__tel">
      <div class="contacts__tel-number" @click="toggleEmail">
        <p>+7 (861) 212-54-45</p>
        <span
          class="contacts__tel-arrow"
          :class="{ open: this.popupStore.currentPopupName === 'ContactEmail' }"
        >
          <BaseIcon name="SelectArrowIcon" />
        </span>
      </div>
      <BaseButtonCall
        :class="{ open: this.popupStore.currentPopupName === 'ContactForm' }"
        @click="toggleCallback"
      />
    </div>
    <Transition>
      <div class="contacts__email" v-if="this.popupStore.currentPopupName === 'ContactEmail'">
        <span class="contacts__email-title">Электронная почта</span>
        <a class="contacts__email-link" href="mailto:sales@ingsystemyuga.ru"
          >sales@ingsystemyuga.ru</a
        >
      </div>
    </Transition>
    <Transition>
      <div
        class="contacts__callback-form"
        v-if="this.popupStore.currentPopupName === 'ContactForm' && this.windowWidth > 1280"
      >
        <template v-if="popupStore.currentPopupProps.submitSuccess">
          <div class="callback-page__text">
            <h2 class="callback-page__title">Спасибо за вашу заявку!</h2>
            <p class="callback-page__subtitle">Наш менеджер свяжется с вами</p>
          </div>
        </template>
        <template v-else>
          <p class="contacts__callback-form-title">Заказать звонок</p>
          <BaseForm
            :fields="[
              { name: 'name', type: 'text', placeholder: 'Имя', required: true },
              {
                name: 'phone',
                type: 'tel',
                placeholder: 'Телефон',
                required: true,
                rules: [
                  {
                    validator: (v) => /^\+?\d{10,}$/.test(v),
                    message: 'Номер должен содержать минимум 10 цифр',
                  },
                ],
              },
              {
                name: 'checkbox',
                type: 'checkbox',
                required: true,
                label: 'Я согласен/на на обработку персональных данных',
              },
            ]"
            @submit-success="handleSubmitSuccess"
          />
        </template>
      </div>
    </Transition>
  </div>
</template>

<script>
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'HeaderContacts',
  props: {
    isMobOpen: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      popupStore: usePopupStore(),
      windowWidth: window.innerWidth,
    }
  },
  computed: {},
  methods: {
    toggleEmail() {
      if (this.popupStore.currentPopupName === 'ContactEmail') {
        this.popupStore.hidePopup()
      } else {
        this.popupStore.showPopup('ContactEmail', {})
      }
    },
    toggleCallback() {
      if (this.windowWidth > 1280) {
        if (this.popupStore.currentPopupName === 'ContactForm') {
          this.popupStore.hidePopup()
        } else {
          this.popupStore.showPopup('ContactForm', { submitSuccess: false })
        }
      } else {
        this.popupStore.showPopup('CallbackPopup', { isVisible: true })
      }
    },
    handleSubmitSuccess() {
      this.popupStore.showPopup('ContactForm', { submitSuccess: true })
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
  },
  mounted() {
    window.addEventListener('resize', this.updateWindowWidth)
    this.updateWindowWidth()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/utils.scss';

.contacts {
  min-width: fit-content;
  max-width: clamp(140px, 17vw, 390px);
  width: 100%;
  padding: 12px;
  background-color: var(--white);
  border: 1px solid var(--grey-100);
  border-radius: var(--br-btn);
  display: flex;
  flex-direction: column;
  transition: 0.3s;

  &.open {
    height: fit-content;
  }

  @include tablet {
    max-width: 100%;
  }

  @include tablet-bottom {
    padding: 6px 10px;
  }

  @media screen and (max-width: 720px) {
    max-width: 100%;
    width: 165px;
  }

  &__tel {
    display: flex;
    flex-direction: column;
    gap: 7px;

    @include laptop-bottom {
      gap: 4px;
    }

    @include tablet-bottom {
      gap: 2px;
    }
  }

  &__tel-number {
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;

    @include laptop-bottom {
      gap: 4px;
    }

    p {
      margin: 0;
      @include fluid-text(16, 12);
      font-weight: 700;
    }
  }

  &__tel-arrow {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    @include tablet {
      width: 16px;
      height: 16px;
    }

    svg {
      margin-bottom: 4px;
      width: 10px;
      height: 8px;

      @include tablet {
        width: 6px;
        height: 5px;
      }
    }

    &.open {
      svg {
        transform: rotate(180deg);
      }
    }
  }

  .base-button-call.open {
    @include laptop-bottom-above {
      margin-bottom: 24px;
    }
  }

  &__email {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--grey-100);
    display: flex;
    flex-direction: column;
    gap: 8px;

    @include tablet {
      margin-top: 14px;
      padding-top: 14px;
      gap: 4px;
    }
  }

  &__email-title {
    font-weight: 600;
    @include fluid-text(12, 9);
    color: var(--grey-200);
  }

  &__email-link {
    font-weight: 700;
    @include fluid-text(16, 9);
    color: var(--black);
    text-decoration: none;
  }

  &__callback-form {
    min-height: 300px;
    height: 100%;
    padding-top: 24px;
    border-top: 1px solid var(--grey-100);
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .callback-page__title {
      font-size: 24px;
      text-align: center;
    }

    .callback-page__subtitle {
      opacity: 0.5;
    }
  }

  &__callback-form-title {
    margin-bottom: 24px;
    font-weight: 700;
    font-size: 16px;
  }

  // .base-input__btn-edit {
  //   display: none;
  // }
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.v-enter-active {
  transition: 0.3s ease-in-out;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
