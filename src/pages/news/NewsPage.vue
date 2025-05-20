<template>
  <BaseEventPage
    :items="allNews"
    :archive-items="getNewsArchive"
    :filter="filter"
    :filters="filters"
    title="Новости"
    archive-title="Архив"
    theme="news"
    @set-filter="setFilter"
    :counts="filterCounts"
  >
    <template #card-item="{ item, isFirst }">
      <NewsCard :news="item" :is-first="isFirst" />
    </template>
    <template #archive-card="{ item }">
      <NewsCard :news="item" :is-first="false" />
    </template>
  </BaseEventPage>
</template>

<script>
import { useNewsStore } from '@/shared/stores/news.js'
import NewsCard from '@/entities/news/NewsCard.vue'
import BaseEventPage from '@/shared/layouts/BaseEventPage.vue'

export default {
  name: 'NewsPage',
  components: {
    BaseEventPage,
    NewsCard,
  },
  data() {
    return {
      filters: [
        { value: 'all', label: 'Все' },
        { value: 'new', label: 'Новые' },
      ],
    }
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
    filterCounts() {
      const counts = {}
      this.filters.forEach((f) => {
        counts[f.value] = this.getNewsCount(f.value)
      })
      return counts
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

<style lang="scss"></style>
