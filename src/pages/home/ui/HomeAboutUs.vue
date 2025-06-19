<template>
  <section class="about-us container">
    <h2 class="visually-hidden"></h2>
    <div class="about-us__img">
      <img src="@/assets/images/home-about-us.png" alt="" width="755" height="786" loading="lazy" />
    </div>
    <div class="about-us__body">
      <article class="about-us__content">
        <h3 class="about-us__title">Онлайн-магазин с полным спектром инженерных услуг</h3>
        <h4 class="about-us__subtitle">Миссия</h4>
        <p class="about-us__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitation
          ullamco Laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in reprehenderit in voluptate velit esse cillum dolore eu
        </p>
        <RouterLink to="/about-us" class="about-us__link base-button">Больше о нас</RouterLink>
      </article>
      <div class="about-us__numbers">
        <div class="about-us__number">
          <span>5 лет</span>
          <p>на рынке продаж</p>
        </div>
        <div class="about-us__number">
          <span>100%</span>
          <p>сертифицированные товары</p>
        </div>
        <div class="about-us__number">
          <span>16</span>
          <p>проверенных поставщиков</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script></script>

<style lang="scss" scoped>
.about-us {
  margin-bottom: var(--section-offset);
  display: flex;
  gap: 8px;

  &__img {
    border-radius: 14px;
    width: 100%;

    img {
      border-radius: 14px;
      object-fit: cover;
      object-position: center;
    }
  }

  &__body {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__content {
    flex-grow: 1;
    width: 100%;
    padding-inline: 9%;
    border-radius: 14px;
    background-color: var(--blue-0);
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-template-rows: 1fr auto 1fr;
    grid-template-areas:
      '. title'
      'subtitle text'
      '. link';
    gap: 60px;
  }

  &__title {
    grid-area: title;
    align-self: flex-end;
    max-width: 60%;
    font-weight: 500;
    font-size: 28px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__subtitle {
    grid-area: subtitle;
    font-weight: 600;
    font-size: 16px;
  }

  &__text {
    grid-area: text;
    max-width: 90%;
    font-weight: 400;
    font-size: 14px;
  }

  &__link {
    grid-area: link;
    align-self: flex-start;
    text-decoration: none;
  }

  &__numbers {
    padding-block: 55px;
    padding-inline: 9% 6%;
    width: 100%;
    border: 1px solid var(--grey-100);
    border-radius: 14px;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    gap: 32px;
  }

  &__number {
    width: fit-content;
    flex-shrink: 1;

    &:not(:first-child) {
      width: min-content;
    }

    span {
      font-weight: 500;
      font-size: 60px;
      color: var(--blue);
    }

    p {
      max-width: 80%;
      font-weight: 500;
      font-size: 14px;
      color: var(--grey-200);
    }
  }
}
</style>
