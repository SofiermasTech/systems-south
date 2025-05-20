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
.promo-card {
  padding: 32px;
  background-color: var(--blue-0);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 20px;

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

  &__date {
    grid-area: date;
    font-size: 14px;
    color: var(--grey-200);
  }

  &__img {
    grid-area: img;
    grid-row: span 3;
    margin-top: auto;
    width: 100%;

    img {
      max-height: 170px;
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 16px;
    }
  }
}
</style>
