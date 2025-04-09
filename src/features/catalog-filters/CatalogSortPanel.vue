<template>
  <div class="sort-panel">
    <p class="sort-panel__title">Сортировать по:</p>
    <ul class="sort-panel__list">
      <li class="sort-panel__item active">
        <p>Сначала дешевые</p>
      </li>
      <li class="sort-panel__item">
        <p>Сначала дорогие</p>
      </li>
      <li class="sort-panel__item">
        <p>В наличии</p>
      </li>
    </ul>
  </div>
</template>
<script></script>
<style lang="scss">
.sort-panel {
  display: flex;
  align-items: center;
  gap: 20px;

  &__title {
    font-weight: 500;
    font-size: 16px;
    color: var(--grey-200);
  }

  &__list {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__item {
    font-weight: 500;
    font-size: 16px;
    color: var(--grey-200);

    &.active {
      font-weight: 500;
      font-size: 16px;
      color: var(--black);
    }
  }
}
</style>
