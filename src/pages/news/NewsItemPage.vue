<template>
  <div class="news-page container">
    <IntroPages :title="news.title" />
    <section class="news-page__content">
      <div class="news-page__img">
        <img :src="news.image" alt="" />
      </div>
      <div class="news-page__text">
        <p>{{ news.description1 }}</p>
        <p>{{ news.description2 }}</p>
        <p>{{ news.description3 }}</p>
        <p>{{ news.description4 }}</p>
      </div>
    </section>
  </div>
  <section class="additional container">
    <SubscribeEmail />
    <NewsOtherItems />
  </section>
  <CallbackSection />
</template>

<script>
import { useNewsStore } from '@/shared/stores/news.js'
import IntroPages from '@widgets/intro-pages/IntroPages.vue'
import NewsOtherItems from '@/pages/news/ui/NewsOtherItems.vue'
import SubscribeEmail from '@/widgets/subscribeEmail/SubscribeEmail.vue'
import CallbackSection from '@/widgets/callbackSection/CallbackSection.vue'

export default {
  name: 'NewsItemPage',
  components: {
    IntroPages,
    NewsOtherItems,
    SubscribeEmail,
    CallbackSection,
  },
  computed: {
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

  .other-news {
    margin-top: 28px;
  }
}
</style>
