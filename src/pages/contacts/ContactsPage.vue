<template>
  <section class="contacts-page container">
    <IntroPages title="Контакты" />
    <div class="contacts-page__content">
      <div class="contacts-page__info">
        <div class="contacts-page__text">
          <div class="contacts-page__text-item">
            <p>Основной адрес</p>
            <address>Краснодар, ул. Солнечная, д. 4/Б, пом. 14/1</address>
          </div>
          <div class="contacts-page__text-item">
            <p>Склад</p>
            <address>Краснодар, ул. Солнечная, д. 4/Б, пом. 14/1</address>
          </div>
          <div class="contacts-page__text-item">
            <p>Время работы</p>
            <span>
              Ежедневно с <time datetime="9:00">9:00</time> по <time datetime="18:00">18:00</time>
            </span>
            <span>
              Ежедневно с <time datetime="9:00">9:00</time> по <time datetime="18:00">18:00</time>
            </span>
          </div>
        </div>
        <div class="contacts-page__text">
          <div class="contacts-page__text-item">
            <p>Телефон для связи</p>
            <a href="tel:+78612125445">+7 (861) 212-54-45</a>
            <a href="tel:+78612125445">+7 (861) 212-54-45</a>
          </div>
          <div class="contacts-page__text-item">
            <p>Отдел продаж</p>
            <a href="mailto:sales@ingsystemyuga.ru">sales@ingsystemyuga.ru</a>
          </div>
        </div>
      </div>
      <div class="contacts-page__map"></div>
    </div>
  </section>
  <CallbackSection />
</template>

<script>
import IntroPages from '@widgets/intro-pages/IntroPages.vue'
import CallbackSection from '@/widgets/callbackSection/CallbackSection.vue'

export default {
  name: 'SearchPage',
  components: {
    IntroPages,
    CallbackSection,
  },
}
</script>

<style lang="scss">
.contacts-page {
  margin-bottom: var(--section-offset);
  display: flex;
  flex-direction: column;
  gap: 60px;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 100px;
  }

  &__info {
    display: flex;
    gap: 16px;
  }

  &__text {
    max-width: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 48px;
  }

  &__text-item {
    display: flex;
    flex-direction: column;
    gap: 16px;

    p {
      margin: 0;
      font-size: 14px;
      color: var(--grey-200);
    }
    address,
    a,
    span {
      font-weight: 500;
      font-size: 32px;
      line-height: 110%;
      letter-spacing: -0.04em;
      color: var(--blue);
      font-style: normal;
      text-decoration: none;
    }
  }

  &__map {
    width: 100%;
    max-height: 700px;
    height: 70vh;
    background-color: var(--blue);
    border-radius: 16px;
  }
}
</style>
