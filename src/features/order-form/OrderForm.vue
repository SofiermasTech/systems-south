<template>
  <section class="order-form">
    <form class="order-form__form" @submit.prevent="submitForm" novalidate>
      <fieldset class="order-form__fieldset">
        <legend class="order-form__title">Данные заказчика</legend>
        <div class="order-form__wrapper">
          <BaseInput
            type="text"
            placeholder="Имя"
            required
            v-model="form.name"
            :error="errors.name"
            @input="validateField('name')"
          />
          <BaseInput
            type="text"
            placeholder="Фамилия"
            required
            v-model="form.surname"
            :error="errors.surname"
            @input="validateField('surname')"
          />
          <BaseInput
            type="email"
            placeholder="E-mail"
            required
            v-model="form.email"
            :error="errors.email"
            @input="validateField('email')"
          />
          <BaseInput
            type="tel"
            placeholder="Телефон"
            required
            v-model="form.tel"
            :error="errors.tel"
            @input="validateField('tel')"
          />
          <base-input
            type="checkbox"
            v-model="form.isLegal"
            :error="errors.isLegal"
            @change="validateField('isLegal')"
          >
            <template #label>
              <p>Я - юридическое лицо</p>
            </template>
          </base-input>
          <BaseInput
            v-if="form.isLegal"
            type="text"
            placeholder="ИНН"
            required
            v-model="form.inn"
            :error="errors.inn"
            @input="validateField('inn')"
          />
          <BaseInput
            v-if="form.isLegal"
            type="text"
            placeholder="Юр. адрес"
            required
            v-model="form.legalAddress"
            :error="errors.legalAddress"
            @input="validateField('legalAddress')"
          />
        </div>
      </fieldset>
      <fieldset class="order-form__fieldset">
        <legend class="order-form__title">Способ доставки</legend>
        <div class="order-form__wrapper order-form__wrapper--delivery">
          <base-input
            type="radio"
            name="delivery"
            value="Самовывоз"
            v-model="form.deliveryMethod"
            @change="validateField('deliveryMethod')"
          >
            <template #label>
              <p class="base-input__radio-name">Самовывоз</p>
              <span class="base-input__radio-text">г. Москва, Варшавское шоссе, 118к1, оф.45</span>
            </template>
          </base-input>
          <base-input
            type="radio"
            name="delivery"
            value="Транспортная компания"
            v-model="form.deliveryMethod"
            @change="validateField('deliveryMethod')"
          >
            <template #label>
              <p class="base-input__radio-name">Транспортная компания</p>
            </template>
          </base-input>
          <span v-if="errors.deliveryMethod" class="base-input__error">{{
            errors.deliveryMethod
          }}</span>
        </div>
      </fieldset>
      <fieldset class="order-form__fieldset">
        <legend class="order-form__title">Комментарии к заказу</legend>
        <base-input
          type="textarea"
          placeholder="Оставьте свой комментарий"
          v-model="form.comments"
          :error="errors.comments"
        ></base-input>
        <base-input
          type="checkbox"
          required
          v-model="form.consent"
          :error="errors.consent"
          @change="validateField('consent')"
        >
          <template #label>
            <p>Я согласен/на на обработку персональных данных</p>
          </template>
        </base-input>
        <base-button type="submit" :disabled="isSubmitting"
          ><span>Отправить заявку</span></base-button
        >
      </fieldset>
    </form>
  </section>
</template>

<script>
import { useCartStore } from '@/shared/stores/cart.js'
import { useCatalogStore } from '@/shared/stores/catalog.js'

export default {
  name: 'OrderForm',
  data() {
    return {
      form: {
        name: '',
        surname: '',
        email: '',
        tel: '',
        isLegal: false,
        inn: '',
        legalAddress: '',
        deliveryMethod: '',
        comments: '',
        consent: false,
      },
      errors: {
        name: '',
        surname: '',
        email: '',
        tel: '',
        isLegal: '',
        inn: '',
        legalAddress: '',
        deliveryMethod: '',
        comments: '',
        consent: '',
      },
      isSubmitting: false,
      cartStore: null,
      catalogStore: null,
    }
  },
  created() {
    this.cartStore = useCartStore()
    this.catalogStore = useCatalogStore()
  },
  computed: {
    cartItemsWithDetails() {
      return this.cartStore.cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        product: this.catalogStore.getProductById(item.id) || {},
      }))
    },
    totalAmount() {
      return this.cartItemsWithDetails.reduce(
        (total, item) => total + (item.product.price || 0) * item.quantity,
        0,
      )
    },
  },
  methods: {
    validateField(fieldName) {
      this.errors[fieldName] = ''

      switch (fieldName) {
        case 'name':
          if (!this.form.name.trim()) this.errors.name = 'Введите имя'
          break
        case 'surname':
          if (!this.form.surname.trim()) this.errors.surname = 'Введите фамилию'
          break
        case 'email':
          if (!this.form.email.trim()) this.errors.email = 'Введите email'
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email))
            this.errors.email = 'Некорректный email'
          break
        case 'tel':
          if (!this.form.tel.trim()) this.errors.tel = 'Введите номер телефона'
          else if (!/^\+?\d{10,}$/.test(this.form.tel.replace(/\D/g, '')))
            this.errors.tel = 'Номер телефона должен содержать минимум 10 цифр'
          break
        case 'inn':
          if (this.form.isLegal && !this.form.inn.trim()) this.errors.inn = 'Введите ИНН'
          break
        case 'legalAddress':
          if (this.form.isLegal && !this.form.legalAddress.trim())
            this.errors.legalAddress = 'Введите юридический адрес'
          break
        case 'deliveryMethod':
          if (!this.form.deliveryMethod) this.errors.deliveryMethod = 'Выберите способ доставки'
          break
        case 'consent':
          if (!this.form.consent) this.errors.consent = 'Необходимо согласие'
          break
      }
    },
    submitForm() {
      this.validateField('name')
      this.validateField('surname')
      this.validateField('email')
      this.validateField('tel')
      this.validateField('isLegal')
      this.validateField('inn')
      this.validateField('legalAddress')
      this.validateField('deliveryMethod')
      this.validateField('consent')
      this.validateField('comments')

      let isValid = Object.values(this.errors).every((error) => !error)

      if (isValid) {
        this.isSubmitting = true
        const orderData = {
          customer: this.form,
          items: this.getCartItemsData(),
          totalAmount: this.totalAmount,
        }
        console.log('Отправка данных:', orderData)
        this.$emit('submit-success', orderData)
        this.resetForm()
      }
    },
    resetForm() {
      this.errors = {
        name: '',
        surname: '',
        email: '',
        tel: '',
        isLegal: '',
        inn: '',
        legalAddress: '',
        deliveryMethod: '',
        comments: '',
        consent: '',
      }
      this.form = {
        name: '',
        surname: '',
        email: '',
        tel: '',
        isLegal: false,
        inn: '',
        legalAddress: '',
        deliveryMethod: null,
        comments: '',
        consent: false,
      }
      this.isSubmitting = false
    },
    getCartItemsData() {
      return this.cartItemsWithDetails.map((item) => ({
        name: item.product.name || 'Неизвестный товар',
        article: item.product.article || 'N/A',
        quantity: item.quantity,
        price: item.product.price || 0,
      }))
    },
  },
}
</script>

<style lang="scss">
.order-form {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 48px;
  }

  &__fieldset {
  }

  &__title {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 20px;
    line-height: 110%;
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    &--delivery {
      display: flex;
      position: relative;
    }
  }

  .base-input-label--checkbox {
    grid-column: span 2;

    .base-input__error {
      left: 36px;
    }
  }

  .base-input-label--radio {
    max-width: 265px;
    width: 100%;
    padding: 16px;
    border: 1px solid var(--blue-100);
    border-radius: 4px;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: flex-start;
    align-items: center;
    column-gap: 12px;
    row-gap: 4px;
  }

  .base-input__radio-name {
    font-weight: 500;
    font-size: 14px;
    color: var(--black);
  }

  .base-input__radio-text {
    font-weight: 400;
    font-size: 12px;
    color: var(--grey-200);
  }

  .base-button {
    margin-top: 24px;
    width: 100%;
  }

  .base-input__error {
    bottom: -14px;
    left: 18px;
  }
}
</style>
