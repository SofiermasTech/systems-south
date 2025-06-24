<template>
  <div class="intro-pages" :class="{ 'catalog-intro': isCatalogPage }">
    <BreadcrumbsList />
    <div class="intro-pages__text">
      <h2 class="intro-pages__title">{{ title || currentRouteTitle }}</h2>
      <p v-if="isCatalogPage" class="intro-pages__subtitle">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      </p>
    </div>
    <div v-if="isCatalogPage" class="intro-pages__img">
      <img src="../../assets/images/hero-1.png" alt="" />
    </div>
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
  data() {
    return {
      imagesIntro: [{}],
    }
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
    isCatalogPage() {
      return this.$route.path.startsWith('/catalog')
    },
  },
}
</script>

<style lang="scss" scoped>
.intro-pages {
  height: clamp(240px, 27vh, 280px);
  margin-top: 12px;
  background-image: radial-gradient(
    160.58% 121.28% at 84.47% 95.14%,
    #e3eff9 2.49%,
    #fafdff 41.49%,
    #e7f1fb 93.71%
  );
  // padding: 40px 32px;
  border-radius: var(--br-block);
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    'bread img'
    'text img';
  position: relative;

  &.catalog-intro {
    height: clamp(270px, 30vh, 320px);
  }

  .breadcrumb {
    grid-area: bread;
    padding: 40px 32px 8px;
  }

  &__text {
    padding: 8px 32px 40px;
    grid-area: text;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 16px;
  }

  &__title {
    max-width: 90%;
    font-weight: 500;
    font-size: 60px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__subtitle {
    max-width: 60%;
    font-size: 14px;
  }

  &__img {
    position: relative;
    // right: 0;
    // top: 0;
    grid-area: img;
    overflow: hidden;

    img {
      transform: rotate(-25deg);
      position: absolute;
      right: -5%;
      top: 20%;
    }
  }
}
</style>
