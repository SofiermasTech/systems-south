<template>
  <div class="sort-view">
    <button
      class="sort-view__btn sort-view__btn--vertical"
      type="button"
      :class="{ active: viewMode === 'vertical' }"
      @click="changeView('vertical')"
    >
      <span>
        <BaseIcon name="VerticalSortIcon" />
      </span>
    </button>
    <button
      class="sort-view__btn sort-view__btn--horizontal"
      type="button"
      :class="{ active: viewMode === 'horizontal' }"
      @click="changeView('horizontal')"
    >
      <span>
        <BaseIcon name="HorizontalSortIcon" />
      </span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    viewMode: {
      type: String,
      default: 'vertical',
    },
  },
  emits: ['view-change'],
  methods: {
    changeView(mode) {
      this.$emit('view-change', mode)
    },
  },
}
</script>
<style lang="scss">
.sort-view {
  display: flex;
  align-items: center;
  gap: 8px;

  &__btn {
    border: 1px solid var(--blue-100);
    border-radius: var(--br-btn);
    background-color: transparent;
    color: var(--blue);
    padding: 10px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.active {
      background-color: var(--blue-0);
      border-color: var(--blue-0);
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  &__btn--vertical {
  }

  &__btn--horizontal {
  }
}
</style>
