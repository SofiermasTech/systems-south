<template>
  <section class="team">
    <div class="team__body container">
      <div class="team__body-top">
        <h2 class="team__title h2">Лучшая команда для&nbsp;вашего бизнеса</h2>
        <SliderArrow :swiper="teamSwiper" :is-beginning="teamIsBeginning" :is-end="teamIsEnd" />
      </div>
      <BaseSlider
        :slides="teamSlides"
        :options="teamOptions"
        @swiper-ready="onTeamSwiperReady"
        @navigation-update="onTeamNavigationUpdate"
      >
        <template #default="{ item, index }">
          <div class="team__slide">
            <div class="team__slide-img">
              <img :key="index" :src="item.image" :alt="item.name" />
            </div>
            <h3 class="team__slide-name">{{ item.name }}</h3>
            <p class="team__slide-job">{{ item.job }}</p>
          </div>
        </template>
      </BaseSlider>
    </div>
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
      teamSwiper: null,
      teamIsBeginning: true,
      teamIsEnd: false,
      teamSlides: [
        {
          name: 'Имя и Фамилия',
          job: 'Должность',
          image: '/images/team-item.jpg',
        },
        {
          name: 'Имя и Фамилия',
          job: 'Должность',
          image: '/images/team-item.jpg',
        },
        {
          name: 'Имя и Фамилия',
          job: 'Должность',
          image: '/images/team-item.jpg',
        },
        {
          name: 'Имя и Фамилия',
          job: 'Должность',
          image: '/images/team-item.jpg',
        },
        {
          name: 'Имя и Фамилия',
          job: 'Должность',
          image: '/images/team-item.jpg',
        },
      ],
      teamOptions: {
        loop: false,
        slidesPerView: 4,
        spaceBetween: 8,
        autoplay: false,
        pagination: false,
        breakpoints: {
          320: {
            slidesPerView: 1.5,
          },
          400: {
            slidesPerView: 1.8,
          },

          490: {
            slidesPerView: 2.4,
          },
          700: {
            slidesPerView: 3.2,
          },
          800: {
            slidesPerView: 3.5,
          },
          821: {
            slidesPerView: 4,
          },
        },
      },
    }
  },
  methods: {
    onTeamSwiperReady(swiper) {
      this.teamSwiper = swiper
      this.teamIsBeginning = swiper.isBeginning
      this.teamIsEnd = swiper.isEnd
    },
    onTeamNavigationUpdate({ isBeginning, isEnd }) {
      this.teamIsBeginning = isBeginning
      this.teamIsEnd = isEnd
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.team {
  padding-top: clamp(40px, 3.5vw, 70px);
  padding-bottom: clamp(40px, 4vw, 80px);
  display: flex;
  justify-content: center;

  &__body {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: clamp(30px, 2.5vw, 50px);
    margin: 0 auto;

    .base-slider .swiper-slide {
      height: clamp(260px, 28vw, 450px);
    }
  }

  &__body-top {
    display: flex;
    justify-content: space-between;

    @include tablet-bottom {
      padding-inline: var(--container-padding-y);
    }
  }

  &__title {
    &.h2 {
      max-width: 40%;
      @include fluid-text(56, 24);

      @include tablet {
        max-width: 50%;
      }

      @include mobile {
        font-size: 32px;
        max-width: 80%;
      }

      @include mobile-bottom {
        max-width: 100%;
      }
    }
  }

  &__slide {
    background-color: var(--white);
    border-radius: var(--br-block);
    padding: clamp(14px, 1.2vw, 24px);
  }

  &__slide-img {
    margin-bottom: 16px;
    border-radius: var(--br-block);
    width: 100%;
    max-height: clamp(185px, 19vw, 340px);

    @include tablet {
      margin-bottom: 12px;
    }

    img {
      width: 100%;
      border-radius: var(--br-block);
      object-fit: cover;
      object-position: center;
      max-height: clamp(185px, 19vw, 340px);
    }
  }

  &__slide-name {
    margin-bottom: 8px;
    font-weight: 500;
    @include fluid-text(20, 12);
  }

  &__slide-job {
    @include fluid-text(16, 10);
    color: var(--grey-200);
  }

  .slider-arrow {
    @include mobile {
      display: none;
    }
  }

  .container {
    @include tablet-bottom {
      max-width: 100%;
      padding-inline: 0;
      margin: 0;
    }
  }

  .base-slider {
    width: 100%;
    .swiper-wrapper {
      @include tablet-bottom {
        padding-inline: 20px;
      }
    }
  }
}
</style>
