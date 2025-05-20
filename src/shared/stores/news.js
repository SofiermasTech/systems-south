import { defineStore } from 'pinia'
import newsData from '@/assets/data/news.json'

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [],
    filter: 'all',
  }),
  actions: {
    loadNews() {
      const sortedNews = newsData.sort((a, b) => new Date(b.date) - new Date(a.date))
      this.news = sortedNews
    },
    setFilter(filter) {
      this.filter = filter
    },
  },
  getters: {
    getNews(state) {
      if (state.filter === 'all') {
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
        return state.news.filter((news) => new Date(news.date) >= sixMonthsAgo)
      }
      if (state.filter === 'new') {
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return state.news.filter((news) => new Date(news.date) >= thirtyDaysAgo)
      }
      return state.news
    },
    getNewsCount: (state) => (filter) => {
      if (filter === 'all') {
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
        return state.news.filter((news) => new Date(news.date) >= sixMonthsAgo).length
      }
      if (filter === 'new') {
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return state.news.filter((news) => new Date(news.date) >= thirtyDaysAgo).length
      }
      return 0
    },
    getNewsArchive(state) {
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
      return state.news.filter((news) => new Date(news.date) < sixMonthsAgo)
    },
    getLatestNews: (state) => state.news.slice(0, 3),
    getNewsById: (state) => (id) => {
      return state.news.find((item) => item.id === id)
    },
  },
})
