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
      <img :src="news.image" alt="" loading="lazy" />
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
        month: 'numeric',
        year: 'numeric',
      })
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.news-card {
  padding: clamp(20px, 1.5vw, 32px);
  background-color: var(--blue-0);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &:first-child {
    grid-column: span 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'title img'
      'subtitle img'
      'bottom bottom';
    gap: 32px;

    .news-card__bottom {
      grid-column: span 2;

      @include mobile {
        grid-column: span 1;
      }
    }

    @include mobile {
      grid-column: span 1;
      grid-row: span 2;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto clamp(210px, 55vw, 250px) auto;
      grid-template-areas:
        'title'
        'subtitle'
        'img'
        'bottom';
      gap: 20px;
    }
  }

  &__title {
    grid-area: title;
    font-weight: 500;
    @include fluid-text(36, 16);
    line-height: 110%;
    letter-spacing: -0.04em;
  }

  &__text {
    grid-area: subtitle;
    @include fluid-text(16, 10);
  }

  &__bottom {
    grid-area: bottom;
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  &__bottom-date {
    @include fluid-text(16, 10);
    color: var(--grey-200);
  }

  &__bottom-link {
    @include fluid-text(16, 10);
    text-decoration: underline;
    text-underline-offset: 4px;
    text-align: right;
    color: var(--blue);
  }

  &__img {
    grid-area: img;
    grid-row: span 2;
    width: 100%;

    @include mobile {
      grid-row: span 1;
    }

    img {
      width: 100%;
      border-radius: 14px;
      object-fit: cover;
      object-position: center;

      @include mobile {
        max-height: clamp(210px, 55vw, 250px);
        max-width: clamp(315px, 88vw, 560px);
      }
    }
  }
}
</style>
