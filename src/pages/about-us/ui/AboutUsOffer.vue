<template>
  <section class="we-offer">
    <div class="we-offer__body container">
      <h2 class="we-offer__title h2">Что мы<br />предлагаем</h2>
      <div class="we-offer__slider">
        <div class="we-offer__wrapper">
          <swiper
            v-bind="swiperOptions"
            @slide-change="updateProgress"
            @swiper="onSwiper"
            role="slider"
            :aria-label="`Offer slider with ${slides.length} slides`"
            :aria-valuenow="activeSlide + 1"
            :aria-valuemax="slides.length"
          >
            <swiper-slide v-for="(slide, index) in slides" :key="index" class="we-offer__slide">
              <div class="we-offer__slide-text">
                <SliderArrow
                  v-if="swiperInstance"
                  :swiper="swiperInstance"
                  :is-beginning="isBeginning"
                  :is-end="isEnd"
                />
                <h3>{{ slide.title }}</h3>
                <p>{{ slide.text }}</p>
              </div>
              <div class="we-offer__slide-cards">
                <div
                  v-for="(card, cardIndex) in slide.cards"
                  :key="cardIndex"
                  class="we-offer__card"
                >
                  <h4>{{ card.title }}</h4>
                  <img
                    :src="card.image"
                    :alt="card.title"
                    :width="card.width"
                    :height="card.height"
                    loading="lazy"
                  />
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="we-offer__progress-line">
            <div class="we-offer__progress-line-dot">
              <div class="we-offer__dot-item" data-index="0">
                <span></span>
                <p>Партнеры и поставщики</p>
              </div>
              <div class="we-offer__dot-wrapper">
                <div class="we-offer__dot-item" data-index="1">
                  <span></span>
                  <p>Доставка</p>
                </div>
                <div class="we-offer__dot-item" data-index="2">
                  <span></span>
                  <p>Оборудование</p>
                </div>
              </div>
              <div class="we-offer__dot-item" data-index="3">
                <span></span>
                <p>Сервис</p>
              </div>
            </div>
            <div class="we-offer__progress">
              <div
                class="we-offer__progress-fill"
                :style="{ width: progress + '%' }"
                @transitionend="onProgressTransitionEnd"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SliderArrow from '@widgets/slider-arrow/SliderArrow.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default {
  name: 'AboutUsOffer',
  components: {
    Swiper,
    SwiperSlide,
    SliderArrow,
  },
  data() {
    return {
      activeSlide: -1,
      targetSlide: 0,
      swiperInstance: null,
      swiperOptions: {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        allowTouchMove: true,
      },
      slides: [
        {
          title: 'Партнеры и поставщики',
          text: 'Вы можете оформить заказ на нашем сайте, добавив товары в корзину и следуя инструкциям по оформлению. Также вы можете связаться с нами по телефону или электронной почте для консультации и оформления заказа.',
          cards: [
            {
              title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
              image: '/images/about-us/offer-1-1.png',
              width: 250,
              height: 250,
            },
            {
              title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
              image: '/images/about-us/offer-1-2.png',
              width: 250,
              height: 249,
            },
            {
              title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
              image: '/images/about-us/offer-1-3.png',
              width: 257,
              height: 277,
            },
            {
              title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
              image: '/images/about-us/offer-1-4.png',
              width: 242,
              height: 250,
            },
          ],
        },
        {
          title: 'Доставка и оплата',
          text: 'Мы предлагаем удобные способы доставки и оплаты. Выберите подходящий вариант при оформлении заказа и следите за статусом доставки в личном кабинете.',
          cards: [
            {
              title: 'Доставка 1',
              image: '/images/about-us/offer-1-1.png',
              width: 250,
              height: 250,
            },
            {
              title: 'Доставка 2',
              image: '/images/about-us/offer-1-2.png',
              width: 250,
              height: 249,
            },
            {
              title: 'Доставка 3',
              image: '/images/about-us/offer-1-3.png',
              width: 257,
              height: 277,
            },
            {
              title: 'Доставка 4',
              image: '/images/about-us/offer-1-4.png',
              width: 242,
              height: 250,
            },
          ],
        },
        {
          title: 'Гарантия и сервис',
          text: 'Мы предоставляем гарантию на все товары и услуги. Наши специалисты всегда готовы помочь с ремонтом или заменой.',
          cards: [
            {
              title: 'Гарантия 1',
              image: '/images/about-us/offer-1-1.png',
              width: 250,
              height: 250,
            },
            {
              title: 'Гарантия 2',
              image: '/images/about-us/offer-1-2.png',
              width: 250,
              height: 249,
            },
            {
              title: 'Гарантия 3',
              image: '/images/about-us/offer-1-3.png',
              width: 257,
              height: 277,
            },
            {
              title: 'Гарантия 4',
              image: '/images/about-us/offer-1-4.png',
              width: 242,
              height: 250,
            },
          ],
        },
        {
          title: 'Консультации и поддержка',
          text: 'Наша команда готова ответить на ваши вопросы 24/7. Обращайтесь к нам для получения профессиональной помощи.',
          cards: [
            {
              title: 'Поддержка 1',
              image: '/images/about-us/offer-1-1.png',
              width: 250,
              height: 250,
            },
            {
              title: 'Поддержка 2',
              image: '/images/about-us/offer-1-2.png',
              width: 250,
              height: 249,
            },
            {
              title: 'Поддержка 3',
              image: '/images/about-us/offer-1-3.png',
              width: 257,
              height: 277,
            },
            {
              title: 'Поддержка 4',
              image: '/images/about-us/offer-1-4.png',
              width: 242,
              height: 250,
            },
          ],
        },
      ],
    }
  },
  computed: {
    progress() {
      return (this.targetSlide / (this.slides.length - 1)) * 100
    },
    isBeginning() {
      return this.activeSlide <= 0
    },
    isEnd() {
      return this.activeSlide >= this.slides.length - 1
    },
  },
  methods: {
    updateProgress(swiper) {
      this.targetSlide = swiper.realIndex
      this.activeSlide = swiper.previousRealIndex || 0

      const dotItems = document.querySelectorAll('.we-offer__dot-item')
      dotItems.forEach((item) => {
        item.classList.remove('active', 'skip')
      })

      dotItems.forEach((item) => {
        const index = parseInt(item.getAttribute('data-index'), 10)
        if (index < this.targetSlide) {
          item.classList.add('skip')
        }
      })
    },
    onProgressTransitionEnd(event) {
      if (
        event.propertyName === 'width' &&
        event.target.classList.contains('we-offer__progress-fill')
      ) {
        const dotItems = document.querySelectorAll('.we-offer__dot-item')
        const activeDot = document.querySelector(
          `.we-offer__dot-item[data-index="${this.targetSlide}"]`,
        )
        if (activeDot) {
          activeDot.classList.add('active')
          this.activeSlide = this.targetSlide
        }

        dotItems.forEach((item) => {
          const index = parseInt(item.getAttribute('data-index'), 10)
          if (index < this.targetSlide) {
            item.classList.add('skip')
          }
        })
      }
    },
    prevSlide() {
      if (this.swiperInstance) {
        this.swiperInstance.slidePrev()
      }
    },
    nextSlide() {
      if (this.swiperInstance) {
        this.swiperInstance.slideNext()
      }
    },
    onSwiper(swiper) {
      this.swiperInstance = swiper
    },
  },
  mounted() {
    const dotItems = document.querySelectorAll('.we-offer__dot-item')
    const firstDot = document.querySelector('.we-offer__dot-item[data-index="0"]')
    if (firstDot) {
      firstDot.classList.add('active')
      this.activeSlide = 0
    }
    dotItems.forEach((item) => {
      const index = parseInt(item.getAttribute('data-index'), 10)
      if (index < this.activeSlide) {
        item.classList.add('skip')
      }
    })
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/utils.scss';

.we-offer {
  background-color: var(--white);
  padding-top: clamp(40px, 3.5vw, 70px);
  padding-bottom: clamp(80px, 6vw, 120px);

  &__body {
  }

  &__title {
    margin-bottom: -5%;

    @include mobile {
      font-size: 32px;
      margin-bottom: 32px;
    }
  }

  &__slider {
    max-height: clamp(350px, 50vw, 900px);
    height: 100%;

    @include mobile {
      max-height: 100%;
    }
  }

  &__wrapper {
  }

  &__slide {
    display: grid;
    grid-template-columns: 1fr 1fr;

    @include mobile {
      display: flex;
      flex-direction: column-reverse;
      gap: 32px;
    }
  }

  &__slide-text {
    align-self: flex-end;
    max-width: 75%;
    position: relative;

    @include mobile {
      align-self: flex-start;
      max-width: 100%;
    }

    h3 {
      font-weight: 500;
      @include fluid-text(32, 14);
      margin-bottom: 10px;
    }

    p {
      font-weight: 500;
      @include fluid-text(20, 10);
      color: var(--grey-200);
    }
  }

  &__slide-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 12px;

    @include tablet-bottom {
      gap: 8px;
    }
  }

  &__card {
    min-height: clamp(140px, 17vw, 340px);
    background-color: var(--blue-0);
    border-radius: var(--br-block);
    padding: clamp(12px, 1.5vw, 28px);
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    overflow: hidden;

    h4 {
      margin: 0;
      font-weight: 600;
      @include fluid-text(24, 10);
      color: var(--blue);

      @include tablet-bottom {
        font-weight: 500;
      }
    }

    img {
      margin-bottom: -20%;
      max-width: clamp(100px, 12vw, 250px);
    }
  }

  &__progress-line {
    position: relative;
  }

  &__progress-line-dot {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    position: absolute;
    left: 0;
    top: -4px;
  }

  &__dot-wrapper {
    display: flex;
    justify-content: space-between;

    .we-offer__dot-item:last-child {
      p {
        margin-left: calc(100% - 10px);
      }
    }
  }

  &__dot-item {
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
    z-index: 3;

    &:last-child {
      justify-self: flex-end;

      span {
        align-self: flex-end;
      }
    }

    &.skip {
      span {
        background-color: var(--blue);
      }
    }

    &.active {
      span {
        background-color: var(--blue);
        position: relative;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          width: 24px;
          height: 24px;
          background-color: var(--white);
          border: 1px solid var(--blue);
          border-radius: 50%;
        }
      }

      p {
        color: var(--blue);
      }
    }

    span {
      background-color: var(--blue-300);
      border-radius: 50%;
      width: 12px;
      height: 12px;
    }

    p {
      font-weight: 500;
      @include fluid-text(16, 10);
      color: var(--blue-300);
    }
  }

  &__progress {
    margin-top: clamp(24px, 3vw, 60px);
    width: 100%;
    height: 4px;
    background-color: var(--grey-100);
    border-radius: 2px;
    overflow: hidden;
  }

  &__progress-fill {
    height: 100%;
    background-color: var(--blue);
    transition: width 0.5s ease;
  }
}
</style>
