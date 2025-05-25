<template>
  <div class="intro-pages">
    <BreadcrumbsList />
    <h2 class="intro-pages__title">{{ title || currentRouteTitle }}</h2>
  </div>
</template>

<script>
import BreadcrumbsList from '@widgets/intro-pages/BreadcrumbsList.vue'

export default {
  name: 'IntroPages',
  components: {
    BreadcrumbsList,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    currentRouteTitle() {
      // Берем последний маршрут из $route.matched
      const lastRoute = this.$route.matched[this.$route.matched.length - 1]
      if (!lastRoute || !lastRoute.meta.breadcrumb) {
        return ''
      }
      // Проверяем, является ли breadcrumb функцией, и вызываем её с текущим маршрутом
      return typeof lastRoute.meta.breadcrumb === 'function'
        ? lastRoute.meta.breadcrumb(this.$route)
        : lastRoute.meta.breadcrumb
    },
  },
}
</script>

<style lang="scss" scoped>
.intro-pages {
  height: 26vh;
  margin-top: 12px;
  background-image: radial-gradient(
    160.58% 121.28% at 84.47% 95.14%,
    #e3eff9 2.49%,
    #fafdff 41.49%,
    #e7f1fb 93.71%
  );
  padding: 40px 32px;
  border-radius: var(--br-block);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__title {
    max-width: 60%;
    font-weight: 500;
    font-size: 60px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }
}
</style>
