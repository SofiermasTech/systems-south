<template>
  <nav class="breadcrumb" aria-label="breadcrumb">
    <ul class="breadcrumb__list">
      <li
        class="breadcrumb__item"
        v-for="(item, index) in breadcrumbs"
        :key="index"
        :aria-current="index === breadcrumbs.length - 1 ? 'page' : null"
      >
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
      }

      // Убираем подстраницы из крошек для /personal
      const isPersonalRoute = this.$route.path.startsWith('/personal')
      if (isPersonalRoute) {
        return [
          homeBreadcrumb,
          {
            name: 'Личный кабинет',
            link: null,
          },
        ]
      }

      let crumbs = []
      let currentRoute = {
        path: this.$route.path,
        name: this.$route.name,
        meta: this.$route.meta,
        params: this.$route.params,
      }

      // Рекурсивно собираем крошки
      while (currentRoute) {
        const breadcrumb =
          typeof currentRoute.meta.breadcrumb === 'function'
            ? currentRoute.meta.breadcrumb({ params: currentRoute.params })
            : currentRoute.meta.breadcrumb

        if (breadcrumb) {
          crumbs.push({
            name: breadcrumb,
            link: currentRoute.path !== this.$route.path ? this.resolvePath(currentRoute) : null,
          })
        }

        currentRoute = currentRoute.meta.parentRoute
          ? {
              path: currentRoute.meta.parentRoute.path,
              name: currentRoute.meta.parentRoute.name,
              meta: {
                breadcrumb: currentRoute.meta.parentRoute.breadcrumb,
                parentRoute: currentRoute.meta.parentRoute.parentRoute,
              },
              params: this.getParamsForRoute(currentRoute.meta.parentRoute.path),
            }
          : null
      }

      if (!crumbs.some((crumb) => crumb.name === 'Главная')) {
        crumbs.push({ name: 'Главная', link: '/' })
      }

      // console.log('Breadcrumbs:', crumbs)
      return crumbs.reverse()
    },
  },
  methods: {
    resolvePath(route) {
      let path = route.path
      if (route.params) {
        Object.keys(route.params).forEach((param) => {
          path = path.replace(`:${param}`, route.params[param])
        })
      }
      return path
    },
    getParamsForRoute(path) {
      const params = { ...this.$route.params }
      // Ограничиваем параметры в зависимости от пути
      if (path === '/catalog') {
        return {} // Нет параметров
      } else if (path === '/catalog/:category') {
        return { category: params.category } // Только category
      }
      return params // Для /catalog/:category/:subcategory все параметры
    },
  },
}
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
