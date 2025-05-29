<template>
  <section class="order-form">
    <fieldset class="order-form__fieldset">
      <legend class="order-form__title">Данные заказчика</legend>
      <div class="order-form__wrapper">
        <label class="order-form__label popup-form__label">
          <input
            class="order-form__input popup-form__input"
            type="text"
            required
            placeholder="Имя"
          />
          <span class="order-form__error"></span>
        </label>
        <label class="order-form__label popup-form__label">
          <input
            class="order-form__input popup-form__input"
            type="text"
            required
            placeholder="Фамилия"
          />
          <span class="order-form__error"></span>
        </label>
        <label class="order-form__label popup-form__label">
          <input
            class="order-form__input popup-form__input"
            type="email"
            required
            placeholder="E-mail"
          />
          <span class="order-form__error"></span>
        </label>
        <label class="order-form__label popup-form__label">
          <input
            class="order-form__input popup-form__input"
            type="tel"
            required
            placeholder="Телефон"
          />
          <span class="order-form__error"></span>
        </label>
        <label class="order-form__label popup-form__label popup-form__label--checkbox">
          <input type="checkbox" />
          <p style="margin-bottom: 0">Я - юридическое лицо</p>
          <span class="order-form__error"></span>
        </label>
        <label class="order-form__label popup-form__label">
          <input
            class="order-form__input popup-form__input"
            type="text"
            required
            placeholder="ИНН"
          />
          <span class="order-form__error"></span>
        </label>
        <label class="order-form__label popup-form__label">
          <input
            class="order-form__input popup-form__input"
            type="text"
            required
            placeholder="Юр. адрес"
          />
          <span class="order-form__error"></span>
        </label>
      </div>
    </fieldset>
    <fieldset class="order-form__fieldset">
      <legend class="order-form__title">Способ доставки</legend>
      <div class="order-form__wrapper order-form__wrapper--delivery">
        <div class="order-form__radio-wrapper">
          <input class="order-form__radio" type="radio" name="delivery" value="Самовывоз" />
          <p class="order-form__radio-name">Самовывоз</p>
          <span class="order-form__radio-text">г. Москва, Варшавское шоссе, 118к1, оф.45</span>
        </div>
        <div class="order-form__radio-wrapper">
          <input
            class="order-form__radio"
            type="radio"
            name="delivery"
            value="Транспортная компания"
          />
          <p class="order-form__radio-name">Транспортная компания</p>
        </div>
      </div>
    </fieldset>
    <fieldset class="order-form__fieldset">
      <legend class="order-form__title">Комментарии к заказу</legend>
      <textarea class="order-form__textarea" name="" id="">Оставьте свой комментарий</textarea>
      <label class="order-form__label popup-form__label popup-form__label--checkbox">
        <input type="checkbox" required />
        <p>Я согласен/на на обработку персональных данных</p>
        <span class="order-form__error"></span>
      </label>
      <BaseButton><span>Отправить заявку</span></BaseButton>
    </fieldset>
  </section>
</template>

<script>
export default {
  name: 'OrderForm',
}
</script>

<style lang="scss">
.order-form {
  display: flex;
  flex-direction: column;
  gap: 48px;

  &__fieldset {
    // display: flex;
    // flex-direction: column;
    // gap: 24px;
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
    gap: 12px;

    &--delivery {
      display: flex;
    }
  }

  &__label {
    &.popup-form__label--checkbox {
      grid-column: span 2;

      p {
        margin: 0;
      }
    }
  }

  &__input {
  }

  &__error {
  }

  &__radio-wrapper {
    max-width: 265px;
    width: 100%;
    padding: 16px;
    border: 1px solid var(--blue-100);
    border-radius: 4px;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: flex-start;
    column-gap: 12px;
    row-gap: 4px;
  }

  &__radio {
    grid-row: span 2;
    margin: 0;
    align-self: flex-start;
    width: 24px;
    height: 24px;
  }

  &__radio-name {
    font-weight: 500;
    font-size: 14px;
  }

  &__radio-text {
    font-weight: 400;
    font-size: 12px;
    color: var(--grey-200);
  }

  &__textarea {
    margin-bottom: 16px;
    padding: 16px;
    background-color: var(--blue-0);
    border-radius: 16px;
    border: none;
    resize: none;
    width: 100%;
    height: 180px;
    font-weight: 400;
    font-size: 14px;
    color: var(--blue-300);
  }

  .base-button {
    margin-top: 24px;
    width: 100%;
  }
}
</style>
