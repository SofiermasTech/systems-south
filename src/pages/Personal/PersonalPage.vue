<template>
  <div class="personal container">
    <IntroPages class="personal__intro" />
    <div class="personal__sidebar">
      <nav class="personal__nav">
        <RouterLink
          :to="{ name: 'PersonalProfile' }"
          class="personal__nav-item"
          active-class="personal__nav-item--active"
        >
          Профиль
        </RouterLink>
        <RouterLink
          :to="{ name: 'PersonalFavorites' }"
          class="personal__nav-item"
          active-class="personal__nav-item--active"
        >
          Избранное
        </RouterLink>
        <RouterLink
          :to="{ name: 'PersonalOrders' }"
          class="personal__nav-item"
          active-class="personal__nav-item--active"
        >
          Заказы
        </RouterLink>
      </nav>
    </div>
    <div class="personal__content">
      <router-view />
    </div>
  </div>
</template>

<script>
import IntroPages from '@widgets/intro-pages/IntroPages.vue'
export default {
  name: 'PersonalPage',
  components: {
    IntroPages,
  },
}
</script>
<style lang="scss">
@import "@/assets/styles/_utils.scss";

.personal {
  margin-bottom: var(--section-offset);
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    'intro intro'
    'sidebar content';
  row-gap: 60px;
  column-gap: 80px;

  &__intro {
    grid-area: intro;
  }

  &__sidebar {
    grid-area: sidebar;
    height: 70vh;
    padding: 8px;
    background-color: var(--blue-0);
    border-radius: var(--br-block);
  }

  &__nav {
    display: flex;
    flex-direction: column;
  }

  &__nav-item {
    border-radius: var(--br-btn);
    padding: 24px 12px 24px 32px;
    font-size: 14px;
    color: var(--black);
    text-decoration: none;
    cursor: pointer;

    &--active {
      background-color: var(--white);
      font-weight: 600;
      color: var(--blue);
    }

    @include hover {
      background-color: var(--white);
      font-weight: 600;
      color: var(--blue);
    }
  }

  &__content {
    grid-area: content;
  }
}
</style>
