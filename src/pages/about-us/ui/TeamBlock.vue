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
      },
    }
  },
  methods: {
    onTeamSwiperReady(swiper) {
      this.teamSwiper = swiper;
      this.teamIsBeginning = swiper.isBeginning;
      this.teamIsEnd = swiper.isEnd;
    },
    onTeamNavigationUpdate({ isBeginning, isEnd }) {
      this.teamIsBeginning = isBeginning;
      this.teamIsEnd = isEnd;
    },
  },
}
</script>

<style lang="scss">
.team {
padding-top: clamp(40px, 7.5vh, 70px);
padding-bottom: clamp(50px, 9vh, 80px);

  &__body {
    display: flex;
    flex-direction: column;
    gap: 48px;
  }

  &__body-top {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    &.h2 {
      max-width: 40%;
    }
  }

  &__slide {
    background-color: var(--white);
    border-radius: 16px;
    padding: 24px;
  }

  &__slide-img {
    margin-bottom: 16px;
    border-radius: 16px;
    width: 100%;
    max-height: 296px;

    img {
      border-radius: 16px;
      object-fit: cover;
      object-position: center;
    }
  }

  &__slide-name {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 16px;
  }

  &__slide-job {
    font-size: 14px;
    color: var(--grey-200);
  }
}

</style>
