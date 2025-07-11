<template>
  <footer class="footer">
    <div class="footer__top-line">
      <ul class="footer__benf-list">
        <li class="footer__benf-list-item">
          <p>7 лет на рынке</p>
          <span></span>
        </li>
        <li class="footer__benf-list-item">
          <p>Дистрибьютор проф. оборудования</p>
          <span></span>
        </li>
        <li class="footer__benf-list-item">
          <p>Удобная оплата и доставка по РФ</p>
          <span></span>
        </li>
        <li class="footer__benf-list-item">
          <p>Гарантия и собственный сервисный центр</p>
          <span></span>
        </li>
      </ul>
      <ul v-if="is730px" class="footer__benf-list list-2">
        <li class="footer__benf-list-item">
          <p>7 лет на рынке</p>
          <span></span>
        </li>
        <li class="footer__benf-list-item">
          <p>Дистрибьютор проф. оборудования</p>
          <span></span>
        </li>
        <li class="footer__benf-list-item">
          <p>Удобная оплата и доставка по РФ</p>
          <span></span>
        </li>
        <li class="footer__benf-list-item">
          <p>Гарантия и собственный сервисный центр</p>
          <span></span>
        </li>
      </ul>
    </div>
    <div class="footer__center">
      <div class="container">
        <div class="footer__content">
          <div class="footer__content-left">
            <div class="footer__office">
              <p class="footer__office-text">Офис продаж</p>
              <address class="footer__office-address">
                <p>Краснодар, ул. Солнечная, д. 4/Б, пом. 14/1</p>
                <time datetime="T10:00-18:00">Пн-Пт: 10:00 - 18:00</time>
                <time datetime="T10:00-16:00">Сб-Вс: 10:00 - 16:00</time>
              </address>
            </div>
            <div class="footer__contacts">
              <a class="footer__contact-tel" href="tel:+78612125445">+7 (861) 212-54-45</a>
              <a class="footer__contact-mail" href="mailto:sales@ingsystemyuga.ru"
                >sales@ingsystemyuga.ru</a
              >
            </div>
          </div>
          <div class="footer__content-right">
            <nav class="footer__nav">
              <div class="footer__nav-wrapper">
                <p class="footer__nav-title">Заголовок</p>
                <ul class="footer__nav-list">
                  <li class="footer__nav-item"><a href="">Ссылка 1 Ссылка 1</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 2</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 3</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 4</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 5</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 6</a></li>
                </ul>
              </div>
              <div class="footer__nav-wrapper">
                <p class="footer__nav-title">Заголовок</p>
                <ul class="footer__nav-list">
                  <li class="footer__nav-item"><a href="">Ссылка 1 Ссылка 1</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 2</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 3</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 4</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 5</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 6</a></li>
                </ul>
              </div>
              <div class="footer__nav-wrapper">
                <p class="footer__nav-title">Заголовок</p>
                <ul class="footer__nav-list">
                  <li class="footer__nav-item"><a href="">Ссылка 1 Ссылка 1</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 2</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 3</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 4</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 5</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 6</a></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container">
        <div class="footer__bottom-content">
          <p class="footer__copyright-text">Copyright © ЮГ КАБЕЛЬ</p>
          <a class="footer__copyright-link" href="/privacy.html" target="_blank">
            Политика конфиденциальности
          </a>
          <div class="footer__leadstudio">
            <p class="footer__leadstudio-text">Разработка</p>
            <a href="https://lead-studio.pro/" target="_blank">
              <img
                src="@/assets/images/icons/leadStudio.svg"
                alt="leadstudio"
                width="130"
                height="25"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      is730px: window.matchMedia('(max-width: 730px)').matches,
      media730: null,
    }
  },

  methods: {
    updateMediaQueries() {
      this.is730px = this.media730.matches
    },
  },
  created() {
    this.media730 = window.matchMedia('(max-width: 730px)')
    this.updateMediaQueries()
  },
  mounted() {
    this.media730.addEventListener('change', this.updateMediaQueries)
  },
  beforeUnmount() {
    this.media730.removeEventListener('change', this.updateMediaQueries)
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/utils.scss';

.footer {
  &__top-line {
    width: 100%;
    padding: 32px;
    background-color: var(--blue);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    @include tablet {
      padding: 20px 0;
    }
  }

  &__benf-list {
    max-width: 1400px;
    width: 100%;
    color: var(--white);
    display: flex;
    justify-content: center;
    gap: 20px;

    @include tablet {
      gap: 10px;
    }

    @media screen and (max-width: 730px) {
      max-width: fit-content;
      flex-shrink: 0;
      animation: line-1 40s infinite linear;
      animation-delay: -40s;

      &.list-2 {
        animation: line-2 40s infinite linear;
        animation-delay: -20s;
      }
    }
  }

  &__benf-list-item {
    display: flex;
    align-items: center;
    gap: 20px;
    font-weight: 600;
    @include fluid-text(16, 10);

    @include tablet {
      gap: 10px;
    }

    @media screen and (max-width: 730px) {
      max-width: fit-content;
      flex-shrink: 0;
    }

    p {
      margin: 0;
    }

    span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--white);

      @include tablet {
        width: 4px;
        height: 4px;
      }
    }

    &:last-child {
      span {
        display: none;
      }
    }
  }

  &__center {
    background-color: var(--blue-0);
    padding-top: clamp(30px, 3.5vw, 70px);
  }

  &__content {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__content-left,
  &__content-right {
    background-color: var(--white);
  }

  &__content-left {
    padding: clamp(20px, 1.5vw, 32px);
    border-radius: clamp(14px, 1vw, 20px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include mobile {
      height: min(25vh, 250px);
    }
  }

  &__office {
  }

  &__office-text {
    margin-bottom: 16px;
    font-weight: 500;
    @include fluid-text(16, 10);
    color: var(--grey-200);

    @include tablet-bottom {
      margin-bottom: 12px;
    }
  }

  &__office-address {
    display: flex;
    flex-direction: column;
    gap: 8px;

    p {
      margin: 0;
      font-weight: 600;
      @include fluid-text(20, 12);
    }

    time {
      font-weight: 500;
      @include fluid-text(20, 12);

      @include mobile {
        font-weight: 400;
      }
    }
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    gap: 12px;

    a {
      text-decoration: none;
    }
  }

  &__contact-tel {
    font-weight: 500;
    @include fluid-text(32, 24);
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__contact-mail {
    font-weight: 600;
    @include fluid-text(24, 14);
    line-height: 110%;
    color: var(--grey-200);
  }

  &__content-right {
    padding: clamp(20px, 1.5vw, 32px);
    border-radius: clamp(14px, 1vw, 20px);
    padding-right: 14%;

    @include mobile {
      padding-right: 20px;
    }
  }

  &__nav {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    gap: clamp(20px, 2vw, 40px);

    @include mobile {
      margin-bottom: 0;
    }
  }

  &__nav-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__nav-title {
    font-weight: 600;
    @include fluid-text(24, 14);
    line-height: 110%;
    color: var(--black);
  }

  &__nav-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__nav-item {
    font-weight: 500;
    @include fluid-text(16, 10);

    a {
      color: var(--grey-200);
      text-decoration: none;
    }
  }

  &__bottom {
    background-color: var(--blue-0);
    padding-block: 30px;

    @media screen and (max-width: 720px) {
      padding-bottom: 100px;
    }
  }

  &__bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include mobile {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  }

  &__copyright-text {
    font-weight: 400;
    @include fluid-text(16, 10);
    text-transform: uppercase;
    color: var(--black);
  }

  &__copyright-link {
    font-weight: 400;
    @include fluid-text(16, 10);
    color: var(--black);
  }

  &__leadstudio {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__leadstudio-text {
    font-weight: 400;
    @include fluid-text(16, 10);
    text-transform: uppercase;
    color: var(--black);
  }
}

@keyframes line-1 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes line-2 {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-200%);
  }
}
</style>
