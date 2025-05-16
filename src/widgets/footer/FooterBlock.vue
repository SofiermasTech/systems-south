<template>
  <footer class="footer">
    <div class="footer__top-line">
      <ul class="footer__benf-list">
        <li class="footer__benf-list-item">7 лет на рынке</li>
        <li class="footer__benf-list-item">Дистрибьютор проф. оборудования</li>
        <li class="footer__benf-list-item">Удобная оплата и доставка по РФ</li>
        <li class="footer__benf-list-item">Гарантия и собственный сервисный центр</li>
      </ul>
    </div>
    <div class="footer__center">
      <div class="container">
        <div class="footer__content">
          <div class="footer__content-left">
            <div class="footer__office">
              <p class="footer__office-text">Офис продаж</p>
              <address class="footer__office-address"></address>
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
                  <li class="footer__nav-item"><a href="">Ссылка 1</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 1</a></li>
                  <li class="footer__nav-item"><a href="">Ссылка 1</a></li>
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
<script></script>
<style lang="scss">
.footer {
  &__top-line {
    width: 100%;
    padding: 32px;
    background-color: var(--blue);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__benf-list {
    max-width: 1400px;
    width: 100%;
    color: var(--white);
    display: flex;
    justify-content: space-between;
  }

  &__benf-list-item {
    font-weight: 600;
    font-size: 16px;
  }

  &__center {
    background-color: var(--blue-0);
    padding-top: 60px;
  }

  &__content {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  &__content-left,
  &__content-right {
    background-color: var(--white);
  }

  &__content-left {
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__office {
  }

  &__office-text {
  }

  &__office-address {
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__contact-tel {
    font-weight: 500;
    font-size: 28px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__contact-mail {
    font-weight: 600;
    font-size: 20px;
    line-height: 110%;
    color: var(--grey-200);
  }

  &__content-right {
    padding: 40px;
  }

  &__nav {
  }

  &__nav-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__nav-title {
    font-weight: 600;
    font-size: 20px;
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
    font-size: 14px;

    a {
      color: var(--grey-200);
      text-decoration: none;
    }
  }

  &__bottom {
    background-color: var(--blue-0);
    padding-block: 24px;
  }

  &__bottom-content {
    display: flex;
    justify-content: space-between;
  }

  &__copyright-text {
    font-weight: 400;
    font-size: 12px;
    text-transform: uppercase;
    color: var(--black);
  }

  &__copyright-link {
    font-weight: 400;
    font-size: 14px;
    color: var(--black);
  }

  &__leadstudio {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__leadstudio-text {
    font-weight: 400;
    font-size: 12px;
    text-transform: uppercase;
    color: var(--black);
  }
}
</style>
