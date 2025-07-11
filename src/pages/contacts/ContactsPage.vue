<template>
  <section class="contacts-page">
    <IntroPages title="Контакты" />
    <div class="contacts-page__content container">
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
import CallbackSection from '@/widgets/callback-section/CallbackSection.vue'

export default {
  name: 'SearchPage',
  components: {
    IntroPages,
    CallbackSection,
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.contacts-page {
  margin-bottom: var(--section-offset);
  display: flex;
  flex-direction: column;
  gap: clamp(30px, 3.5vw, 70px);

  &__content {
    display: flex;
    flex-direction: column;
    gap: clamp(50px, 5vw, 100px);
  }

  &__info {
    display: flex;
    gap: 16px;

    @include tablet {
      justify-content: space-between;
    }

    @include mobile {
      flex-direction: column;
    }
  }

  &__text {
    max-width: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: clamp(24px, 3.5vw, 56px);

    @include mobile {
      max-width: 100%;
    }
  }

  &__text-item {
    display: flex;
    flex-direction: column;
    gap: 16px;

    p {
      margin: 0;
      @include fluid-text(16, 10);
      color: var(--grey-200);
    }
    address,
    a,
    span {
      font-weight: 500;
      @include fluid-text(32, 16);
      line-height: 110%;
      letter-spacing: -0.04em;
      color: var(--blue);
      font-style: normal;
      text-decoration: none;
    }
  }

  &__map {
    width: 100%;
    margin-bottom: clamp(20px, 4vw, 80px);
    height: clamp(285px, 40vw, 700px);
    background-color: var(--blue);
    border-radius: 16px;
  }
}
</style>
