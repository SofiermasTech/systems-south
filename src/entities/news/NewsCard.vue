<template>
  <article class="news-card">
    <h3 class="news-card__title">{{ news.title }}</h3>
    <p class="news-card__text">
      {{ news.subtitle }}
    </p>
    <div class="news-card__bottom">
      <p class="news-card__bottom-date">{{ formatDate(news.date) }}</p>
      <RouterLink class="news-card__bottom-link" :to="`/news/${news.id}`">Читать статью</RouterLink>
    </div>
    <div class="news-card__img" v-if="isFirst">
      <img :src="news.image" alt="" loading="lazy">
    </div>
  </article>
</template>

<script>
export default {
  name: 'NewsCard',
  props: {
    news: {
      type: Object,
      required: true,
    },
    isFirst: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    },
  },
}
</script>

<style lang="scss">
.news-card {
  padding: 32px;
  background-color: var(--blue-0);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &:first-child {
    grid-column: span 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, auto);
    grid-template-areas:
      'title img'
      'subtitle img'
      'bottom bottom';
    gap: 32px;

      .news-card__bottom {
        grid-column: span 2;
      }
  }

  &__title {
    grid-area: title;
    font-weight: 500;
    font-size: 28px;
    line-height: 110%;
    letter-spacing: -0.04em;
  }

  &__text {
    grid-area: subtitle;
    font-size: 14px;
  }

  &__bottom {
    grid-area: bottom;
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  &__bottom-date {
    font-size: 14px;
    color: var(--grey-200);
  }

  &__bottom-link {
    font-size: 14px;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-align: right;
    color: var(--blue);
  }

  &__img {
    grid-area: img;
    grid-row: span 2;
    width: 100%;

    img {
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>
