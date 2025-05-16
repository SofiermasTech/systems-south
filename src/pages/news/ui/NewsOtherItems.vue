<template>
  <section class="other-news">
    <div class="other-news__top">
      <h2 class="other-news__title">Другие новости</h2>
      <SliderArrow :swiper="newsSwiper" :is-beginning="newsIsBeginning" :is-end="newsIsEnd" />
    </div>
    <div class="other-news__content">
      <BaseSlider
        :slides="allNews"
        :options="newsOptions"
        @swiper-ready="onSwiper"
        @navigation-update="updateNavigation"
      >
        <template #default="{ item }">
          <NewsCard :news="item" :is-first="true" />
        </template>
      </BaseSlider>
    </div>
  </section>
</template>

<script>
import { useNewsStore } from '@/shared/stores/news.js'
import BaseSlider from '@/shared/ui/BaseSlider.vue'
import SliderArrow from '@widgets/slider-arrow/SliderArrow.vue'
import NewsCard from '@/entities/news/NewsCard.vue'

export default {
  name: 'NewsOtherItems',
  components: {
    BaseSlider,
    SliderArrow,
    NewsCard,
  },
  data() {
    return {
      newsSwiper: null,
      newsIsBeginning: true,
      newsIsEnd: false,
      newsOptions: {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 8,
        autoplay: false,
        pagination: false,
      },
    }
  },
  computed: {
    allNews() {
      const newsStore = useNewsStore()
      const currentNewsId = this.$route.params.id
      return newsStore.getNews.filter((news) => news.id !== currentNewsId)
    },
  },
  methods: {
    onSwiper(swiper) {
      this.newsSwiper = swiper
    },
    updateNavigation({ isBeginning, isEnd }) {
      this.newsIsBeginning = isBeginning
      this.newsIsEnd = isEnd
    },
  },
}
</script>

<style lang="scss">
.other-news {
  max-width: 50%;

  &__top {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  &__title {
    font-weight: 500;
    font-size: 48px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__content {
  }
}
</style>
