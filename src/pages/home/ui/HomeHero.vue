<template>
  <section class="hero container">
    <div class="hero__body">
      <div class="hero__block hero__block--main">
        <div class="hero__block-wrapper">
          <div class="hero__block-top">
            <span class="hero__top-sticker">
              <BaseIcon name="StickerSaleIcon" />
            </span>
            <p class="hero__top-text">ТОП-продаж</p>
          </div>
          <h2 class="hero__title">Бленда с сетчатым фильтром и посадочным кольцом</h2>
          <div class="hero__block-info">
            <div class="hero__info-item">
              <span>Модель</span>
              <p>LGD-NIKA-BDH-R100</p>
            </div>
            <div class="hero__info-item">
              <span>Материал</span>
              <p>Алюминий</p>
            </div>
            <div class="hero__info-item">
              <span>Цена</span>
              <p>18 742 ₽</p>
            </div>
          </div>
          <a href="#" class="hero__link base-button">На страницу товара</a>
        </div>
        <div class="hero__block-img">
          <img src="@/assets/images/hero-1.png" alt="" width="535" height="424" />
        </div>
      </div>
      <div class="hero__block hero__block--sale">
        <div class="hero__block-wrapper">
          <span class="hero__top-sticker">
            <BaseIcon name="StickerSaleIcon" />
          </span>
          <div class="hero__sale-timer"></div>
        </div>
        <h3 class="hero__sale-title">
          При покупке кабеля или провода фирмы Noname получите скидку 5%
        </h3>
        <a href="#" class="hero__sale-link base-button">Подробнее</a>
      </div>
      <RouterLink to="/about-us" class="hero__block hero__block--about">
        <div class="hero__block-content">
          <h2 class="hero__block-title">О нас</h2>
          <div class="hero__block-bottom">
            <div class="hero__block-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut
            </div>
            <div class="hero__block-arrow">
              <BaseIcon name="ArrowUpRightIcon" />
            </div>
          </div>
        </div>
      </RouterLink>
      <div class="hero__block hero__block--delivery">
        <div class="hero__block-content">
          <h2 class="hero__block-title">Доставка и оплата</h2>
          <div class="hero__block-bottom">
            <div class="hero__block-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut
            </div>
            <div class="hero__block-arrow">
              <BaseIcon name="ArrowUpRightIcon" />
            </div>
          </div>
        </div>
      </div>
      <div class="hero__block hero__block--contacts">
        <div class="hero__block-content">
          <h2 class="hero__block-title">Контакты</h2>
          <div class="hero__block-bottom">
            <div class="hero__block-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut
            </div>
            <div class="hero__block-arrow">
              <BaseIcon name="ArrowUpRightIcon" />
            </div>
          </div>
        </div>
      </div>
      <RouterLink to="/faq" class="hero__block hero__block--faq">
        <div class="hero__block-content">
          <h2 class="hero__block-title">FAQ</h2>
          <div class="hero__block-bottom">
            <div class="hero__block-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut
            </div>
            <div class="hero__block-arrow">
              <BaseIcon name="ArrowUpRightIcon" />
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script></script>

<style lang="scss">
.hero {
  margin-top: 12px;
  margin-bottom: var(--section-offset);
  height: 95vh;
  max-height: 870px;
  // height: 100%;

  &__body {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1.4fr 1fr;
    gap: 8px;
  }

  &__block {
    width: 100%;
    height: 100%;
    padding: 24px;
    background-color: var(--blue-0);
    border-radius: var(--br-block);
    text-decoration: none;
    color: inherit;
  }

  &__block--main {
    grid-column: span 3;
    // max-height: 460px;
    padding-top: 32px;
    padding-bottom: 44px;
    display: flex;
    gap: 24px;
    background-image: url('@/assets/images/hero-main-back.png');
    background-repeat: no-repeat;
    background-position: -350% center;

    .hero__block-wrapper {
      max-width: 47%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .hero__block-top {
      display: flex;
    }

    .hero__top-sticker {
      background-color: var(--black);
      border-radius: 50%;
      padding: 10px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 18px;
        height: 20px;
        color: var(--orange);
      }
    }

    .hero__top-text {
      padding: 12px 14px;
      border-radius: 500px;
      background-color: var(--white);
      font-family: var(--font-family);
      font-weight: 600;
      font-size: 12px;
    }

    .hero__title {
      font-weight: 500;
      font-size: 40px;
      line-height: 110%;
      letter-spacing: -0.04em;
      color: var(--blue);
    }

    .hero__block-info {
      margin-top: auto;
      display: flex;
      gap: 24px;
    }

    .hero__info-item {
      span {
        font-weight: 500;
        font-size: 14px;
        color: var(--grey-200);
      }

      p {
        margin-top: 12px;
        font-weight: 600;
        font-size: 16px;
      }
    }

    .hero__link {
      margin-top: 8px;
      background-color: var(--black);
      text-decoration: none;
    }

    .hero__block-img {
      img {
        width: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }

  &__block--sale {
    padding: 20px 24px 52px 24px;
    background-image: url('@/assets/images/hero-sale-1.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .hero__block-wrapper {
      display: flex;
      justify-content: space-between;
    }

    .hero__top-sticker {
      width: 40px;
      height: 40px;
      background-color: var(--white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        color: var(--orange);
      }
    }

    .hero__sale-timer {
      background-color: var(--white-0);
      border-radius: 10px;
      padding: 12px;
      width: 209px;
      height: 55px;
    }

    .hero__sale-title {
      margin-top: auto;
      font-weight: 600;
      font-size: 20px;
      line-height: 110%;
      color: var(--white);
    }

    .hero__sale-link {
      width: 130px;
      background-color: var(--white);
      font-weight: 500;
      font-size: 12px;
      color: var(--black);
      text-decoration: none;
      text-align: center;
      display: inline;
    }
  }

  &__block--delivery,
  &__block--contacts,
  &__block--faq,
  &__block--about {
    .hero__block-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .hero__block-title {
      font-weight: 500;
      font-size: 32px;
      line-height: 110%;
      letter-spacing: -0.04em;
      color: var(--blue);
    }

    .hero__block-bottom {
      display: flex;
      gap: 16px;
    }

    .hero__block-text {
      font-size: 14px;
    }

    .hero__block-arrow {
      flex-shrink: 0;
      border: 1px solid var(--blue-0);
      border-radius: 50%;
      width: 70px;
      height: 70px;
      background-color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 10px;
        height: 10px;
        color: var(--blue);
      }
    }
  }
}
.container {
}
</style>
