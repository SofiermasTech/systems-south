<template>
  <div class="container">
    <div
      class="intro-pages"
      :class="{ 'catalog-intro': isCatalogPage, 'promo-intro': isPromoItemPage }"
    >
      <BreadcrumbsList />
      <BaseTimer v-if="isPromoItemPage" :promo="item" />
      <div class="intro-pages__text">
        <h2 class="intro-pages__title">{{ title || currentRouteTitle }}</h2>
        <p v-if="isCatalogPage" class="intro-pages__subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut
        </p>
      </div>
      <div v-if="isCatalogPage" class="intro-pages__img">
        <img src="@/assets/images/hero-1.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import BreadcrumbsList from '@widgets/intro-pages/BreadcrumbsList.vue'
import BaseTimer from '@/shared/ui/BaseTimer.vue'

export default {
  name: 'IntroPages',
  components: {
    BreadcrumbsList,
    BaseTimer,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default: null,
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
    isPromoItemPage() {
      return this.$route.path.startsWith('/promo') && !this.$route.path.endsWith('/promo')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/utils.scss';

.intro-pages {
  height: clamp(160px, 19vw, 290px);
  margin-top: 12px;
  background-image: radial-gradient(
    160.58% 121.28% at 84.47% 95.14%,
    #e3eff9 2.49%,
    #fafdff 41.49%,
    #e7f1fb 93.71%
  );
  border-radius: var(--br-block);
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    'bread img'
    'text img';
  position: relative;

  &.promo-intro {
    @include mobile {
      height: fit-content;
    }
  }

  @include mobile {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 20px;
  }

  &.catalog-intro {
    height: clamp(160px, 19vw, 320px);

    @include mobile {
      height: 300px;
      padding: 0;
    }
  }

  .breadcrumb {
    grid-area: bread;
    padding: clamp(20px, 2.2vw, 44px) clamp(20px, 2vw, 36px) 8px;
  }

  &__text {
    padding: 8px clamp(20px, 2vw, 36px) clamp(20px, 2.5vw, 50px);
    grid-area: text;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 16px;

    @include mobile {
      padding-block: 0;
    }
  }

  &__title {
    max-width: 90%;
    font-weight: 500;
    @include fluid-text(64, 24);
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);

    @include mobile {
      max-width: 100%;
    }
  }

  &__subtitle {
    max-width: 60%;
    @include fluid-text(16, 12);

    @include mobile {
      max-width: 80%;
    }
  }

  &__img {
    position: relative;
    grid-area: img;
    overflow: hidden;

    @include mobile {
      width: 100%;
      height: 150px;
      align-self: flex-end;
    }

    img {
      transform: rotate(-25deg);
      position: absolute;
      right: -8%;
      top: 10%;
      max-width: 110%;
      width: 105%;

      @include desktop {
        top: 15%;
      }

      @include mobile {
        max-width: 250px;
        height: 105%;
        right: -12%;
      }
    }
  }

  .timer {
    @include mobile {
      position: static;
      margin-left: 20px;
    }
  }
}
</style>
