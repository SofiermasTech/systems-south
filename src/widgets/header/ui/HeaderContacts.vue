<template>
  <div class="contacts">
    <div class="contacts__tel">
      <div class="contacts__tel-number" @click="toggleEmail">
        <p>+7 (861) 212-54-45</p>
        <span :class="{ open: this.popupStore.currentPopupName === 'ContactEmail' }">
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
        v-if="this.popupStore.currentPopupName === 'ContactForm'"
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
  data() {
    return {
      popupStore: usePopupStore(),
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
      if (this.popupStore.currentPopupName === 'ContactForm') {
        this.popupStore.hidePopup()
      } else {
        this.popupStore.showPopup('ContactForm', { submitSuccess: false })
      }
    },
    handleSubmitSuccess() {
      this.popupStore.showPopup('ContactForm', { submitSuccess: true })
    },
  },
}
</script>

<style lang="scss" scoped>
.contacts {
  max-width: 29.5%;
  width: 100%;
  height: fit-content;
  padding: 15px 24px;
  background-color: var(--white);
  border: 1px solid var(--grey-100);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  transition: 0.3s;

  &__tel {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  &__tel-number {
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;

    p {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
    }

    span {
      width: 20px;
      height: 20px;

      svg {
        margin-bottom: 4px;
        width: 10px;
        height: 8px;
      }

      &.open {
        svg {
          transform: rotate(180deg);
        }
      }
    }
  }

  .base-button-call.open {
    margin-bottom: 24px;
  }

  &__email {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--grey-100);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__email-title {
    font-weight: 600;
    font-size: 12px;
    color: var(--grey-200);
  }

  &__email-link {
    font-weight: 700;
    font-size: 16px;
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
