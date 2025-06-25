<template>
  <div class="sort-panel">
    <p class="sort-panel__title">Сортировать по:</p>
    <ul class="sort-panel__list">
      <li
        class="sort-panel__item"
        :class="{ active: activeSort === 'cheap-first' }"
        @click="setSort('cheap-first')"
      >
        <button type="button">Сначала дешевые</button>
      </li>
      <li
        class="sort-panel__item"
        :class="{ active: activeSort === 'expensive-first' }"
        @click="setSort('expensive-first')"
      >
        <button type="button">Сначала дорогие</button>
      </li>
      <li
        class="sort-panel__item"
        :class="{ active: activeSort === 'in-stock' }"
        @click="setSort('in-stock')"
      >
        <button type="button">В наличии</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  emits: ['sort-change'],
  data() {
    return {
      activeSort: 'cheap-first',
    }
  },
  methods: {
    setSort(sortType) {
      this.activeSort = sortType
      this.$emit('sort-change', sortType)
    },
  },
}
</script>
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
    button {
      background-color: transparent;
      border: none;
      font-weight: 500;
      font-size: 16px;
      color: var(--grey-200);
    }

    &.active {
      button {
        font-weight: 500;
        font-size: 16px;
        color: var(--black);
      }
    }
  }
}
</style>
