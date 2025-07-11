<template>
  <section class="news container">
    <div class="news__top">
      <h2 class="news__top-title h2">Блог</h2>
      <RouterLink to="/news" class="news__top-link base-button">Все новости</RouterLink>
    </div>
    <div class="news__cards">
      <NewsCard
        v-for="(news, index) in latestNews"
        :key="news.id"
        :news="news"
        :is-first="this.is600px ? true : index === 0"
      />
    </div>
  </section>
</template>

<script>
import { useNewsStore } from '@/shared/stores/news.js'
import NewsCard from '@/entities/news/NewsCard.vue'

export default {
  name: 'HomeNews',
  components: {
    NewsCard,
  },
  data() {
    return {
      is800px: window.matchMedia('(max-width: 800px)').matches,
      is600px: window.matchMedia('(max-width: 600px)').matches,
      media800: null,
      media600: null,
    }
  },
  computed: {
    latestNews() {
      const newsStore = useNewsStore()
      let limit = 3

      if (this.is600px) {
        limit = 3
      } else if (this.is800px) {
        limit = 2
      }

      return newsStore.getLatestNews.slice(0, limit)
    },
  },
  methods: {
    updateMediaQueries() {
      this.is800px = this.media800.matches
      this.is600px = this.media600.matches
    },
  },
  created() {
    const newsStore = useNewsStore()
    if (!newsStore.news.length) {
      newsStore.loadNews()
    }

    this.media800 = window.matchMedia('(max-width: 800px)')
    this.media600 = window.matchMedia('(max-width: 600px)')
    this.updateMediaQueries()
  },
  mounted() {
    this.media800.addEventListener('change', this.updateMediaQueries)
    this.media600.addEventListener('change', this.updateMediaQueries)
  },
  beforeUnmount() {
    this.media800.removeEventListener('change', this.updateMediaQueries)
    this.media600.removeEventListener('change', this.updateMediaQueries)
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.news {
  margin-bottom: 56px;

  &__top {
    margin-bottom: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__top-title {
  }

  &__top-link {
    &.base-button {
      background-color: var(--grey-100);
      color: var(--black);
      text-decoration: none;
    }
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;

    @include laptop-bottom {
      gap: 8px;
    }
    @include tablet-bottom {
      grid-template-columns: repeat(3, 1fr);
    }

    @include mobile {
      display: flex;
      width: 100%;
      -ms-scroll-chaining: auto;
      overscroll-behavior: auto;
      -webkit-scroll-snap-type: x mandatory;
      -ms-scroll-snap-type: x mandatory;
      scroll-snap-type: x mandatory;
      overflow-x: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;

      .news-card {
        flex-shrink: 0;
        gap: 20px;
        width: min(70vw, 280px);

        &__bottom {
          order: 1;
        }
      }
    }
  }
}
</style>
