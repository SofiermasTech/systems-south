<template>
  <section class="order-form">
    <fieldset class="order-form__fieldset">
      <legend class="order-form__title">Данные заказчика</legend>
      <div class="order-form__wrapper">
        <BaseInput type="text" placeholder="Имя" required />
        <BaseInput type="text" placeholder="Фамилия" required />
        <BaseInput type="email" placeholder="E-mail" required />
        <BaseInput type="tel" placeholder="Телефон" required />

        <base-input type="checkbox" required>
          <template #label>
            <p>Я - юридическое лицо</p>
          </template>
        </base-input>
        <BaseInput type="text" placeholder="ИНН" required />
        <BaseInput type="text" placeholder="Юр. адрес" required />
      </div>
    </fieldset>

    <fieldset class="order-form__fieldset">
      <legend class="order-form__title">Способ доставки</legend>
      <div class="order-form__wrapper order-form__wrapper--delivery">
        <base-input type="radio" name="delivery" value="Самовывоз">
          <template #label>
            <p class="base-input__radio-name">Самовывоз</p>
            <span class="base-input__radio-text">г. Москва, Варшавское шоссе, 118к1, оф.45</span>
          </template>
        </base-input>
        <base-input type="radio" name="delivery" value="Транспортная компания">
          <template #label>
            <p class="base-input__radio-name">Транспортная компания</p>
          </template>
        </base-input>
      </div>
    </fieldset>
    <fieldset class="order-form__fieldset">
      <legend class="order-form__title">Комментарии к заказу</legend>
      <base-input type="textarea" placeholder="Оставьте свой комментарий"></base-input>
      <base-input type="checkbox" required>
        <template #label>
          <p>Я согласен/на на обработку персональных данных</p>
        </template>
      </base-input>
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

  .base-input-label--checkbox {
    grid-column: span 2;
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
}
</style>
