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
              <a href="tel:+78612125445">+7 (861) 212-54-45</a>
              <a href="mailto:sales@ingsystemyuga.ru">sales@ingsystemyuga.ru</a>
            </div>
          </div>
          <div class="footer__content-right">
            <nav class="footer__nav">
              <div class="footer__nav-wrapper">
                <p class="footer__nav-title">Заголовок </p>
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
      <p class="footer__copyright-text">Copyright © ЮГ КАБЕЛЬ</p>
      <a class="footer__copyright-link" href="/privacy.html" target="_blank">
        Политика конфиденциальности
      </a>
      <div class="footer__leadstudio">
        <p class="footer__leadstudio-text">Разработка</p>
        <a href="https://lead-studio.pro/" target="_blank">
          <img src="@/assets/images/icons/leadStudio.svg" alt="leadstudio" width="130" height="25" />
        </a>
      </div>
    </div>
  </footer>
</template>
<script></script>
<style lang="scss">
.footer {
background-color: violet;
&__top-line {}

&__benf-list {}

&__benf-list-item {}

&__center {}

&__content {}

&__content-left {}

&__office {}

&__office-text {}

&__office-address {}

&__contacts {}

&__content-right {}

&__nav {}

&__nav-wrapper {}

&__nav-title {}

&__nav-list {}

&__nav-item {}

&__bottom {}

&__copyright-text {}

&__copyright-link {}

&__leadstudio {}

&__leadstudio-text {}
}
</style>
