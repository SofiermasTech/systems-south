<template>
  <div class="contacts">
    <div class="contacts__tel">
      <div class="contacts__tel-number" @click="toggleEmail">
        <p>+7 (861) 212-54-45</p>
        <span :class="{ open: emailVisible }"><BaseIcon name="SelectArrowIcon" /></span>
      </div>
      <BaseButtonCall :class="{ open: emailVisible }" @click="toggleCallback" />
    </div>
    <div class="contacts__email" v-if="emailVisible">
      <span class="contacts__email-title">Электронная почта</span>
      <a class="contacts__email-link" href="mailto:sales@ingsystemyuga.ru"
        >sales@ingsystemyuga.ru</a
      >
    </div>
    <div class="contacts__callback-form" v-if="callbackFormVisible">
      <template v-if="submitSuccess">
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
  </div>
</template>

<script>
export default {
  name: 'HeaderContacts',
  data() {
    return {
      emailVisible: false,
      callbackFormVisible: false,
      submitSuccess: false,
    }
  },
  methods: {
    toggleEmail() {
      this.emailVisible = !this.emailVisible
      this.$emit('toggle-overlay', this.isOverlayVisible)
    },
    toggleCallback() {
      this.callbackFormVisible = !this.callbackFormVisible
      this.$emit('toggle-overlay', this.isOverlayVisible)
    },
    closeAll() {
      this.emailVisible = false
      this.callbackFormVisible = false
      this.$emit('toggle-overlay', false)
    },
    handleSubmitSuccess() {
      this.submitSuccess = true
    },
  },
  computed: {
    isOverlayVisible() {
      return this.emailVisible || this.callbackFormVisible
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
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--grey-100);
    margin-bottom: 16px;

    .callback-page__icon {
      img {
        margin-inline: auto;
      }
    }

    .callback-page__title {
      font-size: 24px;
      text-align: center;
    }
  }

  &__callback-form-title {
    margin-bottom: 24px;
    font-weight: 700;
    font-size: 16px;
  }
}

.overlay-page {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--grey-300);
}
</style>
