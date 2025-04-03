<template>
  <div class="personal">
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
export default {
  name: 'PersonalPage',
}
</script>
<style lang="scss"></style>
