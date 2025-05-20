<template>
  <BaseEventItemPage
    :item="news"
    :event-items="allNews"
    :exclude-id="$route.params.id"
    :theme="'news'"
    event-title="Другие новости"
  >
    <template #event-card="{ item }">
      <NewsCard :news="item" :is-first="true" />
    </template>
  </BaseEventItemPage>
</template>

<script>
import { useNewsStore } from '@/shared/stores/news.js'
import BaseEventItemPage from '@/shared/layouts/BaseEventItemPage.vue'
import NewsCard from '@/entities/news/NewsCard.vue'

export default {
  name: 'NewsItemPage',
  components: {
    BaseEventItemPage,
    NewsCard,
  },
  computed: {
    allNews() {
      return useNewsStore().getNews
    },
    news() {
      const newsStore = useNewsStore()
      const newsId = this.$route.params.id
      return newsStore.getNewsById(newsId)
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
.news-page {
  &__content {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  &__img {
    max-width: 550px;
    width: 100%;

    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__text {
    max-width: 50%;
    font-size: 14px;
  }
}

.additional {
  margin-bottom: var(--section-offset);
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  .other-items {
    margin-top: 28px;
  }
}
</style>
