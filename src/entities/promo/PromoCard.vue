<template>
  <RouterLink :to="`/promo/${promo.id}`">
    <article class="promo-card">
      <p class="promo-card__date">до {{ formatDate(promo.date) }}</p>
      <h3 class="promo-card__title">{{ promo.title }}</h3>
      <p class="promo-card__text">
        {{ promo.subtitle }}
      </p>
      <div class="promo-card__img">
        <img :src="promo.image" alt="" loading="lazy" />
      </div>
    </article>
  </RouterLink>
</template>

<script>
export default {
  name: 'PromoCard',
  props: {
    promo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.promo-card {
  padding: clamp(20px, 2vw, 40px);
  background-color: var(--blue-0);
  border-radius: var(--br-block);
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1vw, 20px);

  &__title {
    grid-area: title;
    font-weight: 500;
    @include fluid-text(24, 16);
    line-height: 110%;
    letter-spacing: -0.04em;
  }

  &__text {
    grid-area: subtitle;
    @include fluid-text(16, 10);
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__date {
    grid-area: date;
    @include fluid-text(16, 10);
    color: var(--grey-200);
  }

  &__img {
    grid-area: img;
    grid-row: span 3;
    margin-top: auto;
    width: 100%;
    border-radius: var(--br-block);

    img {
      max-height: clamp(96px, 8vw, 170px);
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: var(--br-block);
    }
  }
}
</style>
