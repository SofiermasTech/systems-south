<template>
  <section class="about-us container">
    <!-- <h2 class="visually-hidden"></h2> -->
    <div class="about-us__img">
      <img src="@/assets/images/home-about-us.png" alt="" width="755" height="786" loading="lazy" />
    </div>
    <!-- <div class="about-us__body"> -->
    <article class="about-us__content">
      <h3 class="about-us__title">Онлайн-магазин с&nbsp;полным спектром инженерных услуг</h3>
      <h4 class="about-us__subtitle">Миссия</h4>
      <p class="about-us__text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitation ullamco
        Laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        reprehenderit in voluptate velit esse cillum dolore eu
      </p>
      <RouterLink to="/about-us" class="about-us__link base-button"
        ><span>Больше о нас</span></RouterLink
      >
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
    <!-- </div> -->
  </section>
</template>

<script></script>

<style lang="scss" scoped>
@import '@/assets/styles/utils.scss';

.about-us {
  margin-bottom: var(--section-offset);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto minmax(clamp(100px, 13vw, 300px), auto);
  justify-content: center;
  grid-template-areas:
    'img content'
    'img num';
  gap: 8px;

  @include mobile {
    grid-template-columns: 1fr;
    grid-template-areas:
      'content'
      'img'
      'num';
  }

  &__img {
    grid-area: img;
    border-radius: var(--br-block);
    width: 100%;

    @include mobile {
      order: 2;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: var(--br-block);
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
    grid-area: content;
    flex-grow: 1;
    width: 100%;
    padding-inline: 9%;
    padding-block: clamp(20px, 4vw, 60px);
    border-radius: var(--br-block);
    background-color: var(--blue-0);
    display: grid;
    grid-template-columns: clamp(40px, 5vw, 100px) 1fr;
    grid-template-rows: 1fr auto 1fr;
    grid-template-areas:
      '. title'
      'subtitle text'
      '. link';
    gap: clamp(20px, 3vw, 60px);

    @include tablet-bottom {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
  }

  &__title {
    grid-area: title;
    align-self: flex-end;
    max-width: 72%;
    font-weight: 500;
    @include fluid-text(32, 16);
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);

    @include tablet-bottom {
      align-self: flex-start;
    }

    @include mobile {
      font-size: 20px;
    }
  }

  &__subtitle {
    grid-area: subtitle;
    font-weight: 600;
    @include fluid-text(16, 10);

    @include tablet-bottom {
      display: none;
    }

    @include mobile {
      font-size: 12px;
      font-weight: 700;
      display: inline-flex;
    }
  }

  &__text {
    grid-area: text;
    max-width: 90%;
    font-weight: 400;
    @include fluid-text(16, 10);

    @include mobile {
      max-width: 100%;
      font-size: 14px;
    }
  }

  &__link {
    width: 160px;
    grid-area: link;
    align-self: flex-start;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;

    @include tablet {
      width: 120px;
    }
  }

  &__numbers {
    grid-area: num;
    padding-block: clamp(20px, 3vw, 65px);
    padding-inline: 9% 6%;
    width: 100%;
    border: 1px solid var(--grey-100);
    border-radius: 14px;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    gap: clamp(12px, 2vw, 32px);

    @include tablet-bottom {
      padding-inline: 20px;
    }

    @include mobile {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }
  }

  &__number {
    width: fit-content;
    flex-shrink: 1;

    @include mobile {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    &:not(:first-child) {
      width: min-content;

      @include mobile {
        width: 100%;
      }
    }

    span {
      font-weight: 500;
      @include fluid-text(64, 20);
      color: var(--blue);

      @include mobile {
        font-size: 40px;
        text-align: center;
      }
    }

    p {
      max-width: 80%;
      font-weight: 500;
      @include fluid-text(16, 8);
      color: var(--grey-200);

      @include mobile {
        max-width: 50%;
        font-size: 12px;
        text-align: center;
      }
    }
  }
}
</style>
