<template>
  <div class="faq">
    <IntroPages />

    <section class="faq__questions container">
      <BaseAccordion v-for="(item, index) in accordionItems" :key="index" :item="item" :id="index">
        <template #titles>
          <h2>{{ item.title }}</h2>
        </template>
        <template #content>
          <p>{{ item.content }}</p>
        </template>
      </BaseAccordion>
    </section>
  </div>
  <CallbackSection />
</template>

<script>
import IntroPages from '@widgets/intro-pages/IntroPages.vue'
import BaseAccordion from '@/shared/ui/BaseAccordion.vue'
import CallbackSection from '@/widgets/callback-section/CallbackSection.vue'

export default {
  name: 'FaqPage',
  components: {
    IntroPages,
    BaseAccordion,
    CallbackSection,
  },
  data() {
    return {
      accordionItems: [
        {
          title: 'Как сделать заказ?',
          content:
            'Вы можете оформить заказ на нашем сайте, добавив товары в корзину и следуя инструкциям по оформлению. Также вы можете связаться с нами по телефону или электронной почте для консультации и оформления заказа.',
        },
        {
          title: 'Могу ли я вернуть товар, если он мне не подошел?',
          content:
            'Вы можете оформить заказ на нашем сайте, добавив товары в корзину и следуя инструкциям по оформлению. Также вы можете связаться с нами по телефону или электронной почте для консультации и оформления заказа.',
        },
        {
          title: 'Какие гарантии предоставляются на вашу продукцию?',
          content:
            'Вы можете оформить заказ на нашем сайте, добавив товары в корзину и следуя инструкциям по оформлению. Также вы можете связаться с нами по телефону или электронной почте для консультации и оформления заказа.',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.faq {
  display: flex;
  flex-direction: column;
  gap: clamp(30px, 3.5vw, 70px);
  margin-bottom: var(--section-offset);

  &__questions {
    display: flex;
    flex-direction: column;
    gap: 12px;

    @include tablet {
      gap: 8px;
    }
  }

  &__item {
    font-weight: 400;
    @include fluid-text(16, 10);
  }
}
</style>
