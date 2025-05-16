<template>
  <div class="news container">
    <IntroPages />
    <section class="news__latest">
      <div class="news__latest-top">
        <button
          class="base-button-tab"
          :class="{ active: filter === 'all' }"
          @click="setFilter('all')"
          type="button"
        >
          <span class="base-button-tab__text">Все</span>
          <span class="base-button-tab__count">{{ getNewsCount('all') }}</span>
        </button>
        <button
          class="base-button-tab"
          :class="{ active: filter === 'new' }"
          @click="setFilter('new')"
          type="button"
        >
          <span class="base-button-tab__text">Новые</span>
          <span class="base-button-tab__count">{{ getNewsCount('new') }}</span>
        </button>
      </div>
      <div class="news__latest-content">
        <NewsCard
          v-for="(news, index) in allNews"
          :key="news.id"
          :news="news"
          :is-first="index === 0"
        />
      </div>
    </section>

    <section class="news__archive">
      <h2 class="news__archive-title h2">Архив</h2>
      <div class="news__archive-content">
        <NewsCard v-for="news in getNewsArchive" :key="news.id" :news="news" :is-first="false" />
      </div>
    </section>
  </div>
  <CallbackSection />
</template>

<script>
import IntroPages from '@widgets/intro-pages/IntroPages.vue'
import { useNewsStore } from '@/shared/stores/news.js'
import NewsCard from '@/entities/news/NewsCard.vue'
import CallbackSection from '@/widgets/callbackSection/CallbackSection.vue'

export default {
  name: 'NewsPage',
  components: {
    IntroPages,
    NewsCard,
    CallbackSection,
  },
  computed: {
    allNews() {
      const newsStore = useNewsStore()
      return newsStore.getNews
    },
    filter() {
      return useNewsStore().filter
    },
    getNewsArchive() {
      return useNewsStore().getNewsArchive
    },
  },
  methods: {
    setFilter(filter) {
      useNewsStore().setFilter(filter)
    },
    getNewsCount(filter) {
      return useNewsStore().getNewsCount(filter)
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
  &__latest {
    margin-top: 60px;
    margin-bottom: var(--section-offset);
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__latest-top {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__latest-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 400px;
    grid-auto-rows: 400px;
    gap: 16px;
  }

  &__archive {
    margin-bottom: var(--section-offset);
  }

  &__archive-title {
    margin-bottom: 40px;
  }

  &__archive-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 400px;
    grid-auto-rows: 400px;
    gap: 16px;

    .news-card {
      grid-column: span 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
}

.base-button-tab {
  border: 1px solid var(--blue-100);
  background-color: transparent;
  border-radius: 500px;
  padding: 4px 4px 4px 16px;
  width: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  cursor: pointer;

  &.active {
    background-color: var(--blue-100);

    .base-button-tab__count {
      background-color: var(--blue);
      color: var(--white);
    }
  }

  &__text {
    font-weight: 500;
    font-size: 16px;
  }

  &__count {
    background-color: var(--blue-100);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
