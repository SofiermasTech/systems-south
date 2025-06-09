<template>
  <div class="empty-text">
    <h2 class="empty-text__title">{{ title }}</h2>
    <p class="empty-text__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseTitleEmptyPage',
  props: {
    title: {
      type: String,
      default: 'Результаты отсутствуют',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.empty-text {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__title {
    font-weight: 500;
    font-size: 48px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__subtitle {
    font-weight: 500;
    font-size: 16px;
    color: var(--grey-200);
  }
}
</style>
