<template>
  <section class="reviews container">
    <div class="reviews__top">
      <h2 class="reviews__title h2">Отзывы наших клиентов</h2>
      <SliderArrow :swiper="reviewSwiper" :is-beginning="reviewIsBeginning" :is-end="reviewIsEnd" />
    </div>
    <BaseSlider
      :slides="reviewSlides"
      :options="reviewOptions"
      @swiper-ready="onReviewsSwiperReady"
      @navigation-update="onReviewsNavigationUpdate"
    >
      <template #default="{ item }">
        <div class="reviews__slide">
          <p class="reviews__slide-name">{{ item.name }}</p>
          <span class="reviews__slide-date">{{ item.job }}</span>
          <p class="reviews__slide-text">{{ item.text }}</p>
        </div>
      </template>
    </BaseSlider>
  </section>
</template>

<script>
import SliderArrow from '@widgets/slider-arrow/SliderArrow.vue'
import BaseSlider from '@/shared/ui/BaseSlider.vue'

export default {
  name: 'TeamBlock',
  components: {
    SliderArrow,
    BaseSlider,
  },
  data() {
    return {
      reviewSwiper: null,
      reviewIsBeginning: true,
      reviewIsEnd: false,
      reviewSlides: [
        {
          name: 'Имя и Фамилия',
          job: '01.01.2025',
          text: 'Вы можете оформить заказ на нашем сайте, добавив товары в корзину и следуя инструкциям по оформлению. Также вы можете связаться с нами по телефону или электронной почте для консультации и оформления заказа.',
        },
        {
          name: 'Имя и Фамилия',
          job: '01.01.2025',
          text: 'Вы можете оформить заказ на нашем сайте, добавив товары в корзину и следуя инструкциям по оформлению. Также вы можете связаться с нами по телефону или электронной почте для консультации и оформления заказа.Вы можете оформить заказ на нашем сайте, добавив товары в корзину и следуя инструкциям по оформлению. Также вы можете связаться с нами по телефону или электронной почте для консультации и оформления заказа.',
        },
        {
          name: 'Имя и Фамилия',
          job: '01.01.2025',
          text: 'Вы можете оформить заказ на нашем сайте, добавив товары в корзину и следуя инструкциям по оформлению. Также вы можете связаться с нами по телефону или электронной почте для консультации и оформления заказа.Вы можете оформить заказ на нашем сайте, добавив товары в корзину и следуя инструкциям по оформлению. ',
        },
        {
          name: 'Имя и Фамилия',
          job: '01.01.2025',
          text: 'Вы можете оформить заказ на нашем сайте, добавив товары в корзину и следуя инструкциям по оформлению. Также вы можете связаться с нами по телефону или электронной почте для консультации и оформления заказа. ',
        },
        {
          name: 'Имя и Фамилия',
          job: '01.01.2025',
          text: 'Вы можете оформить заказ на нашем сайте, добавив товары в корзину и следуя инструкциям по оформлению. Также вы можете связаться с нами по телефону или электронной почте для консультации и оформления заказа. Вы можете оформить заказ на нашем сайте, добавив товары в корзину и следуя инструкциям по оформлению. Также вы можете связаться с нами по телефону или электронной почте для консультации и оформления заказа. ',
        },
      ],
      reviewOptions: {
        loop: false,
        slidesPerView: 4,
        spaceBetween: 8,
        autoplay: false,
        pagination: false,
      },
    }
  },
  methods: {
    onReviewsSwiperReady(swiper) {
      this.reviewSwiper = swiper
      this.reviewIsBeginning = swiper.isBeginning
      this.reviewIsEnd = swiper.isEnd
    },
    onReviewsNavigationUpdate({ isBeginning, isEnd }) {
      this.reviewIsBeginning = isBeginning
      this.reviewIsEnd = isEnd
    },
  },
}
</script>

<style lang="scss">
.reviews {
  padding-top: clamp(40px, 7.5vh, 70px);
  padding-bottom: clamp(50px, 9vh, 80px);
  display: flex;
  flex-direction: column;
  gap: 40px;

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__title {
  }

  &__slide {
    border-radius: 16px;
    padding: 24px;
    background-color: var(--white);
    height: fit-content;
  }

  &__slide-name {
    font-weight: 500;
    font-size: 16px;
  }

  &__slide-date {
    margin-block: 8px 16px;
    display: block;
    font-size: 14px;
    color: var(--grey-200);
  }

  &__slide-text {
    font-size: 14px;
  }
}
</style>

