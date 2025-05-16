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
        :is-first="index === 0"
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
  computed: {
    latestNews() {
      const newsStore = useNewsStore()
      return newsStore.getLatestNews
    },
  },
  created() {
    const newsStore = useNewsStore()
    if (!newsStore.news.length) {
      newsStore.loadNews()
    }
  },
}
</script>

<style lang="scss">
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
  }
}
</style>
