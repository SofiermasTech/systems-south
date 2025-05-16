<template>
  <nav class="breadcrumb" aria-label="breadcrumb">
    <ul class="breadcrumb__list">
      <li class="breadcrumb__item" v-for="(item, index) in breadcrumbs" :key="index">
        <RouterLink v-if="item.link" :to="item.link" class="breadcrumb__link">
          {{ item.name }}
        </RouterLink>
        <span v-else class="breadcrumb__current" aria-current="page">
          {{ item.name }}
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'BreadcrumbsList',
  computed: {
    breadcrumbs() {
      const homeBreadcrumb = {
        name: 'Главная',
        link: '/',
      };

      // Убираем подстраницы из крошек для /personal
      const isPersonalRoute = this.$route.path.startsWith('/personal');
      if (isPersonalRoute) {
        return [
          homeBreadcrumb,
          {
            name: 'Личный кабинет',
            link: null,
          },
        ];
      }

      // Формируем крошки
      let crumbs = [homeBreadcrumb];

      // Если есть parentRoute (для /news/:id)
      if (this.$route.meta.parentRoute) {
        crumbs.push({
          name: this.$route.meta.parentRoute.breadcrumb,
          link: this.$route.meta.parentRoute.path,
        });
      }

      // Добавляем текущий маршрут
      const currentRoute = this.$route.matched.find(r => r.name === this.$route.name);
      if (currentRoute) {
        crumbs.push({
          name: typeof currentRoute.meta.breadcrumb === 'function'
            ? currentRoute.meta.breadcrumb(this.$route)
            : currentRoute.meta.breadcrumb,
          link: null,
        });
      }

      return crumbs;
    },
  },
};
</script>

<style lang="scss">
.breadcrumb {
  // padding-top: 40px;
  // padding-bottom: 30px;

  &__list {
    list-style: none;
    display: flex;
    gap: 28px;
  }

  &__item {
    font-size: 14px;
    color: var(--black);

    a {
      text-decoration: none;
    }

    &:not(:last-child) {
      a {
        position: relative;
        color: var(--blue-300);

        &::after {
          content: '/';
          font-weight: 400;
          font-size: 14px;
          color: var(--blue-300);
          position: absolute;
          right: -16px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
