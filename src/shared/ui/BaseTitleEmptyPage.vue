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
@import '@/assets/styles/utils.scss';

.empty-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;

  @include laptop-bottom {
    gap: 16px;
  }

  @include mobile {
    height: 20vh;
  }

  &__title {
    font-weight: 500;
    @include fluid-text(56, 24);
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__subtitle {
    font-weight: 500;
    @include fluid-text(20, 12);
    color: var(--grey-200);
  }
}
</style>
